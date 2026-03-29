import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: 'src/browser.js',
      name: 'CardFoil',
      fileName: () => 'browser.js',
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        assetFileNames: 'style.css',
      },
    },
  },
});
