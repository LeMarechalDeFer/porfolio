import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import path from "node:path"

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/locales/**", "src/components/ui/**", "src/components/email/**"],
    },
  },
  resolve: {
    alias: {
      "@/public": path.resolve(__dirname, "./public"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
