import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  nitro: {
    // Exclude QA manifests and non-app assets from server bundling to prevent [vite:json] parsing errors
    ignore: [
      "**/figma-parity-manifest.json",
      "**/qa/**",
      "**/tools/**",
      "**/docs/**"
    ],
  },
});
