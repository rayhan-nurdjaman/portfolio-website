![Mostly done](/screenshots/software-renderer/mostly-done.jpg)

# You Must First Invent the Universe

_TL;DR: I built a rendering engine using C++ and the SDL_gpu API, and paired it with a lightweight UI layout engine (Clay). This project demonstrates systems programming, low-level rendering, and performance optimization._

Table of contents

1. [How it started](#how-it-started)
2. What I built (screenshots)
3. Design & architecture
4. Implementation highlights
5. Performance & benchmarks
6. Challenges & solutions
7. How to run
8. What I learned / skills demonstrated
9. Next steps

Software-renderer is my project that helps me to create native desktop applications without using GUI libraries like GTK, Qt, or electron. This was my second venture into graphics programming. My first project was a 2D engine I called jleg, which was built using C++ and GLFW. It ended up being far too complex for my skill level at the time and I ended up abandoning it as I had no real use for it and college entrance exams were coming up. From what I remember, the last feature I managed to implement was a tile based collision system, though it was highly inefficient as it just spawns multiple Box2D bodies for each tile.

## How it started

Fast forward a couple of months, and I decided to revisit graphics programming. I chose SDL because I remembered being overwhelmed with GLFW, so I thought using a library that had "simple" in it's name would be a better idea. It ended up working out and I wrote a 2D graphics engine. The engine used an ECS based architecture, and rendering was done by iterating over all sprite components and rasterizing them appropriately to a texture. That texture was then drawn to the screen using SDL's built-in renderer. While this maybe wasn't a pure software renderer, I was satisfied enough with it. Running it on my Vivobook Pro 15 got me roughly 2000 FPS.

![No alpha amogus](/screenshots/software-renderer/no-alpha.jpg)

I also managed to implement a very primitive physics engine from scratch. It's been a while since I've worked on it, but from what I remember it was very basic. It first detects whether 2 bodies' AABBs are overlapping and which axis they are overlapping on. It then nudges the two bodies half of the overlap amount away so they stop colliding with each other. It then calculates what their velocities should be after colliding with each other using the coefficient of restitution and conservation of momentum. It then finally applies the proper impulse to the bodies using the calculated velocities. Friction forces can be applied by assuming the amount of time the friction force is acting is the same amount of time of the collision impulse, such that the friction impulse is calculated as the friction coefficient times the normal impulse.

![Physics engine](/screenshots/software-renderer/physics-engine.gif)

The quality of the GIF isn't great, but that FPS counter is sitting at around 1400 FPS.

![Rigidbody physics](/screenshots/software-renderer/rigidbody-physics.jpg)

While software-renderer did start out as a 2D game engine, it started with the restriction that it was software rendered. This provided just enough limitations to make the project interesting, but eventually development did start to slow down as there wasn't a real use for the project. It was a good learning experience, but there would be no reason to make anything of value with it in it's current state. If I wanted to make 2D games, Godot would be the better choice for pretty much any reason you could think of.

Around this time however, I started exploring native UI libraries like Qt and GTK. I found Qt to be overkill and confusing and I didn't like how GTK looked. Chromium based UI libraries like Electron also didn't interest me as while it did allow for a lot of customization, I wanted to have something more lightweight.

I eventually discovered Clay, a lightweight UI library that acted like HTML for UI elements. The main drawback was that Clay was only a UI layout engine, not a full UI library like Qt or GTK. This meant that it only positioned elements, and rendering was left up to the developer. This was basically a perfect match, as I had this rendering engine already.

What wasn't so perfect however, was that it used software rendering. This was okay for the low resolution tests I was doing, but trying to render a native resolution window with it caused heavy slowdowns due to the sheer amount of pixels being rendered. Software rendering is a linear process, so the processing time increases linearly with the number of pixels.

Luckily, SDL offers a lower level API for hardware acceleration, called SDL_gpu. This allowed an OpenGL like interface for hardware acceleration that's platform agnostic. Since it acted similarly to OpenGL, I was able to use pick it up decently quick. Here's an example of me testing transparency using it.

![Clay and SDL GPU](/screenshots/software-renderer/clay-and-sdl-gpu.jpg)

Everything after this was minor improvements and code cleanup.

![Somewhat done](/screenshots/software-renderer/somewhat-done.jpg)

Here it is with file dialogs and jpeg loading implemented.

![Mostly done](/screenshots/software-renderer/mostly-done.jpg)

And this is what it currently looks like.

![Photo Sorter](/screenshots/photo-sorter.png)

The underlying software renderer is mostly working at this point. The only thing left to do is to continue optimizing it and further develop the app I built on top of it. Am I going to continue working on it? Probably, as I don't like the other options available, and using this project allows me to integrate low level graphics rendering easily.

One issue I faced was rendering fonts. I forgot why but I avoided the traditional SDL_ttf library. Need to remember that.
Oh it's because the text rendering engine uploads geometry every frame. and i thought just using a quad and offset would be better. can do instancing later.
