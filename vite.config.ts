import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@lib': resolve(__dirname, './src/lib'),
      '@features': resolve(__dirname, './src/features'),
    },
  },
});
