import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@store': path.resolve(import.meta.dirname, './src/store'),
      '@shared': path.resolve(import.meta.dirname, './src/shared'),
      '@pages': path.resolve(import.meta.dirname, './src/pages'),
      '@api': path.resolve(import.meta.dirname, './src/api'),
    },
  },
});
