import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    sourcemap: false,
  },
  // Pruebas unitarias y de componentes (Vitest + Testing Library). Las de
  // sistema/E2E con Playwright viven aparte en tests/e2e.
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
    include: ['src/**/*.test.{js,jsx}'],
    css: false,
    coverage: {
      include: ['src/**/*.{js,jsx}'],
      exclude: ['src/core/database/seed/**', 'src/test/**', 'src/**/*.test.{js,jsx}', 'src/main.jsx'],
    },
  },
})
