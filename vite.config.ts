import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // .env 파일을 process.env에 병합
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    base: "/",
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
            router: ["react-router-dom"],
            ui: ["framer-motion", "lucide-react"],
            state: ["@tanstack/react-query"],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
      sourcemap: false,
    },
    server: {
      hmr: {
        overlay: false,
      },
      proxy: {
        "^/api/.*": {
          target: process.env.VITE_API_BASE_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
