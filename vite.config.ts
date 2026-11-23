import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'engine-earth': ['./src/engines/earth/Earth3DViewer.js'],
          'engine-tectonic': ['./src/engines/tectonic/Tectonic3DViewer.js'],
          'engine-volcano': ['./src/engines/volcano/Volcano3DViewer.js'],
          'engine-endogen': ['./src/engines/endogen/Endogen3DViewer.js']
        }
      }
    }
  }
});
