import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 7878,
    host: '10.97.85.98',
    strictPort: true
  },
  preview: {
    port: 7878,
    host: '10.97.85.98',
  }
})
