import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // 開発時にコンポーネントを更新すると勝手にリロードして
    // idTokenが取得できないため、HMRを無効化する
    hmr: false,
  },
  plugins: [react(), tsconfigPaths()],
});
