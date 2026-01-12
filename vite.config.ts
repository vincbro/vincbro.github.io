import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  root: "./src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    cssCodeSplit: false,
  },
  server: {
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
});
