import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "./", // Ensures correct path resolution in deployment
  plugins: [react()],
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "react-icons", "date-fns"],
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
