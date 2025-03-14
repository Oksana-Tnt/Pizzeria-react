import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@utils": path.resolve(__dirname, "./src/utils"), // Map @utils to src/utils
      config: path.resolve(__dirname, "./src/config"), // Map config to src/config
    },
  },
})
