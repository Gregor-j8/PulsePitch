import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(() => {
  return {
    server: {
      host: '0.0.0.0', // Allow external connections (needed for Docker)
      port: 5173,
      open: true,
      watch: {
        usePolling: true, // Needed for Docker volume mounting on Windows
      },
      proxy: {
        "/api": {
          target: "http://localhost:5000",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      outDir: "build",
    },
    plugins: [
      react(),
      tailwindcss()
    ],
  };
});
