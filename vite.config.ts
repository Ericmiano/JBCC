import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  // CI, Playwright and Lighthouse all expect the dev server on 8080. strictPort fails fast
  // instead of silently moving to another port that nothing is waiting on.
  server: { port: 8080, strictPort: true },
  preview: { port: 8080, strictPort: true },
  plugins: [
    tsconfigPaths(),
    tanstackStart({ server: { entry: "server" } }),
    // DirectAdmin runs the site as a Node.js app (Passenger); deploy/app.js wraps this handler.
    nitro({ preset: "node-middleware", serveStatic: true }),
    viteReact(),
    tailwindcss(),
  ],
});
