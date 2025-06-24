import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
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
          // React 관련 라이브러리들을 vendor chunk로 분리
          vendor: ["react", "react-dom"],
          // 라우팅 관련
          router: ["react-router-dom"],
          // UI 라이브러리들
          ui: ["framer-motion", "lucide-react"],
          // 상태 관리 및 API
          state: ["@tanstack/react-query"],
        },
      },
    },
    // 번들 크기 경고 임계값 조정
    chunkSizeWarningLimit: 1000,
    // 소스맵 생성 비활성화 (프로덕션에서)
    sourcemap: false,
  },
  // 개발 서버 최적화
  server: {
    hmr: {
      overlay: false,
    },
  },
});
