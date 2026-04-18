import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  base: './',
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    assetsInlineLimit: 0,
  },
  server: {
    port: 5173,
    open: true,
  },
});
