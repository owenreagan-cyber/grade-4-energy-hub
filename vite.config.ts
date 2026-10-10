// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  nitro: {
    // Nitro auto-bundles the root `assets/` folder as server assets. That folder holds
    // curriculum source files (not server data), so drop it from the server bundle.
    modules: [
      (nitro: { options: { rootDir: string; serverAssets: { dir: string }[] } }) => {
        console.log("[assets-filter]", JSON.stringify(nitro.options.serverAssets));
        const curriculumAssets = `${nitro.options.rootDir.replace(/\/$/, "")}/assets`;
        nitro.options.serverAssets = nitro.options.serverAssets.filter(
          (a) => a.dir.replace(/\/$/, "") !== curriculumAssets,
        );
      },
    ],
  },
});
