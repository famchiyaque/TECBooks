import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Use env vars
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      port: parseInt(env.VITE_PORT) || 7878,
      host: env.VITE_HOST || 'localhost',
      strictPort: true,
    },
    preview: {
      port: parseInt(env.VITE_PREVIEW_PORT) || 7880,
      host: env.VITE_HOST || 'localhost',
    },
  }
})
