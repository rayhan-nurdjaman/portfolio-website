# You Must First Invent the Universe

I built this project because I wanted to make native desktop apps without touching Qt, GTK, or Electron. It started as a 2D software renderer and somehow turned into a hardware-accelerated UI backend and a RAW photo editor that simulates actual film chemistry. Here's how that happened.

## How it started

This wasn't my first attempt at graphics programming. My first project, [jleg](https://github.com/satiniize/jleg), was a 2D engine in C++ with GLFW. I was way out of my depth and I abandoned it once college entrance exams started eating my time. The last thing I remember building was tile-based collision, and it was bad to say the least. Every tile on the map spawned its own Box2D body, which is about as wasteful as it sounds.

A few months later I gave it another shot, this time with SDL instead of GLFW. GLFW had felt like too much to deal with, and SDL at least had "simple" in the name.

## The ECS engine and physics

This one actually went somewhere. I built a 2D engine around an ECS — sprite components got rasterized into a pixel buffer, and that buffer got handed to SDL's renderer. Whether that counts as a "real" software renderer is debatable, but it ran at around 2000 FPS on my Vivobook Pro 15, so I wasn't complaining.

![No alpha amogus](/screenshots/software-renderer/no-alpha.jpg)

I also wrote a basic 2D physics engine from scratch:

1. Check AABB overlaps and figure out the penetration axis.
2. Push both bodies apart by half the overlap so they stop intersecting.
3. Resolve velocities post-collision using conservation of momentum and a restitution coefficient, then apply the impulse.
4. Approximate friction as the friction coefficient times the normal impulse, assuming it acts over the same duration as the collision.

![Physics engine](/screenshots/software-renderer/physics-engine.gif)

The FPS counter in that GIF was hovering around 1400, despite the compression making it hard to see clearly.

![Rigidbody physics](/screenshots/software-renderer/rigidbody-physics.jpg)

Eventually this stalled out. It was fun to build, but I had no actual use for a 2D game engine. If I wanted to make games, Godot does everything here better. I wanted a foundation for desktop tools, not games.

## Looking for a UI library

I looked at the usual options. Qt felt overbuilt and confusing for what I needed. GTK's look and developer experience never clicked for me. Electron was out of the question as I didn't want to ship a Chromium instance to render a few sliders.

Then I found Clay, a lightweight layout engine by Nic Barker, basically like flexbox but in C. The catch is that Clay only does layout, it calculates bounding boxes and positions, but draws nothing itself. Rendering is entirely on you. Since I already had a renderer, this fit well.

Except my renderer was software-based, and that fell apart fast once I tried an actual native-resolution window. Software rendering scales linearly with pixel count, and a full HiDPI display is a lot of pixels.

## Moving to SDL_gpu

SDL3 has a lower-level GPU abstraction called SDL_gpu, which gives you something close to an OpenGL-style interface without writing raw Vulkan or DirectX. Since I already had OpenGL-adjacent experience, picking it up wasn't bad.

![Clay and SDL GPU](/screenshots/software-renderer/clay-and-sdl-gpu.jpg)

This eventually grew into a more cohesive UI layout, component, and rendering engine, which I ended up naming it graphiite.

### SDF UI primitives

Rather than plain rounded rectangles, I render UI elements as signed distance fields, using a power-4 distance function so corners come out as smooth superellipses ("squircles") instead of circular arcs, with independent radii per corner and support for stroke cutouts:

```glsl
float rounded_rect_sdf_per_corner(vec2 pos, vec2 half_extents, vec4 radii) {
    float power = 4.0;
    vec4 scaled_radii = radii * 2.0;
    float r = pos.x < 0.0
        ? (pos.y < 0.0 ? scaled_radii.x : scaled_radii.z)
        : (pos.y < 0.0 ? scaled_radii.y : scaled_radii.w);

    vec2 d = abs(pos) - half_extents + r;
    vec2 d_clamped = max(d, 0.0);
    float outer = pow(pow(d_clamped.x, power) + pow(d_clamped.y, power), 1.0 / power);
    return outer + min(max(d.x, d.y), 0.0) - r;
}
```

The fragment shader computes an inner and outer distance and smooths the edges with `smoothstep()`, which gets clean strokes and curvature without any tessellation.

### Text rendering

I stayed away from SDL_ttf mainly because it re-uploads geometry and texture data every time text changes, which is wasteful when you're rendering UI text constantly. My first thought was to just use a quad with a texture offset per glyph, which turned into building an SDF font atlas baked offline, sampled at runtime:

```glsl
void main() {
    vec2 sampled_uv = uv_rect.xy + v_texcoord * (uv_rect.zw - uv_rect.xy);
    vec4 albedo = texture(myTextureSampler, sampled_uv);

    // SDF threshold: on-edge = 128 (0.502)
    float sdf = albedo.a;
    float smoothing = 0.2;
    float edge = 128.0 / 255.0;
    float alpha = smoothstep(edge - smoothing, edge + smoothing, sdf);

    vec4 color = vec4(albedo.rgb * v_color.rgb * modulate.rgb, alpha * v_color.a * modulate.a);
    FragColor = vec4(color.rgb * color.a, color.a);
}
```

I also wrote my own cursor advancing and glyph offset logic so the fonts don't have to be monospace. Getting the padding, baselines, and quad bounds right took a lot of trial and error, but the text ends up crisp at any scale.

### Sliders

Clay doesn't track any state, so interactive elements like sliders need their own tracking outside the layout pass. Since only one slider can be dragged at a time, I keep a single static context: clicking inside a slider's bounds marks it active, mouse movement keeps updating it even if the cursor leaves the slider's bounding box (normal desktop slider behavior), and releasing the mouse clears the context.

## oxiide: a film-based RAW editor

I shoot Fujifilm and like the film-simulation look, but in-camera recipes and LUTs feel a bit limiting. Lightroom, Darktable, and RawTherapee are all built around digital color curves rather than anything resembling actual film chemistry. So on top of graphiite, I started building oxiide — a RAW editor based on how light actually passes through physical dye layers, instead of RGB curve manipulation.

The pipeline:

1. Convert incoming exposure into log exposure (\(\log\_{10} H\)).
2. Run each channel through a sigmoidal H-D response curve, using \(D*{min}\), \(D*{max}\), slope \(k\), and offset \(x_0\).
3. Combine dye layers via Beer-Lambert absorption to get final transmittance.

```glsl
float sigmoid(float x, float k, float x0) {
    return 1.0 / (1.0 + exp(-k * (x + x0)));
}

vec4 exposure_to_density(vec4 pixel) {
    const float LN10 = log(10.0);
    const float LOG10_2 = log(2.0) / LN10;
    const float exposure_adjustment = LOG10_2 * exposure_compensation;
    const float epsilon = 1.0 / 65535.0;

    vec3 log_exposure = log(pixel.xyz + vec3(epsilon)) / LN10 + vec3(exposure_adjustment);
    log_exposure = clamp(log_exposure, -5.0, 0.0);

    vec3 rgb_density = d_min.xyz + (d_max.xyz - d_min.xyz) * vec3(
        sigmoid(log_exposure.x, k.x, x0.x),
        sigmoid(log_exposure.y, k.y, x0.y),
        sigmoid(log_exposure.z, k.z, x0.z)
    );

    return vec4(rgb_density, pixel.w);
}

vec4 density_to_transmittance(vec4 pixel) {
    const float NEG_LN10 = -log(10.0);
    return vec4(exp(pixel.xyz * NEG_LN10), pixel.w);
}
```

The whole thing runs as one compute shader:

```text
RAW file → LibRaw decode (background thread) → uploaded as textures
  → compute pass: color correction matrix → crosstalk matrix → exposure-to-density → dye absorption → density-to-transmittance → output texture → viewport
```

LibRaw decoding happens on a background thread so the UI never blocks. The compute pass runs right before the render pass, so sliders update live — even on a dual-core ThinkPad T470 with 26MP Fuji RAW files.

![Photo Sorter](/screenshots/photo-sorter.png)

I also implemented a recipe file that compresses user presets into 40 bytes strings shareable as files, allowing users to easily share their presets with other users.

## Where it stands

graphiite (the rendering backend) is public. oxiide (the editor built on top of it) is private for now. Doing this instead of grabbing Qt or Electron off the shelf took a lot longer, but I ended up with a binary that's under a megabyte, starts instantly, and runs fine on old hardware, which was the whole point.
