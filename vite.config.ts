import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tanstackStart({ server: { entry: "server" } }),
    // DirectAdmin runs the site as a Node.js app (Passenger); deploy/app.js wraps this handler.
    nitro({ preset: "node-middleware", serveStatic: true }),
    viteReact(),
    tailwindcss(),
  ],
});
