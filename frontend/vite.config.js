// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import dotenv from 'dotenv';

// // Load environment variables from .env file
// dotenv.config(); 
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
