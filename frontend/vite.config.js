import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default ({ command }) => {
  // Determine if the command is 'build' or 'serve'
  const isProduction = command === "build";

  return defineConfig({
    plugins: [react()],
    server: {
      port: 4000,
      proxy: {
        "/api": {
          target: "http://localhost:5000",
          changeOrigin: true,
        },
      },
    },
  });
};
