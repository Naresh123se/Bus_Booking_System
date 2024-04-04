// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000, // Port number for the development server
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // URL of your backend server
        changeOrigin: true,
      },
    },
  },
});
