import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import TanStackRouterVite from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    react(),
  ],
  publicDir: false,
});
