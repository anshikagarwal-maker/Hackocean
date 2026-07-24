// Configuration is loaded from the pre-configured vite-tanstack-config package
// which automatically sets up TanStack Start, React, Tailwind, and Nitro build targets.
// Additional custom configurations can be passed to defineConfig.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
