import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,

  // return a list of URLs to prerender at build time
  async prerender() {
    return [
      "/",
      "/projects/this-website",
      "/projects/gauss-chamber",
      "/projects/software-renderer",
      "/projects/cycloidal-drives",
    ];
  },
} satisfies Config;
