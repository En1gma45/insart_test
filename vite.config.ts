import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/p24api/pubinfo?exchange&coursid=5': 'https://api.privatbank.ua/',
    },
  },
  resolve: {
    preserveSymlinks: true,
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
});
