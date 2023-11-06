import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: "/index.html",
      },
    },
    output: {
      publicPath: "/",
    },
    // PWA-related settings
    manifest: {
      name: "CVENT",
      short_name: "CVENT",
      description: "CVENT Kiosk",
      start_url: ".",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#000000",
      icons: [
        {
          src: "cventlogo.png",
          sizes: "192x192",
          type: "image/png",
        },
      ],
    },
  },
  server: {
    base: "./",
  },
  // Additional configuration for your service worker
  serviceWorker: {
    src: "src/sw.js",
    // Specify the destination of the service worker file
    swDest: "dist/sw.js",
    // Configure the files to be precached
    globDirectory: "dist",
    globPatterns: ["**/*.{js,css,html,png,jpg}"],
  },
});
