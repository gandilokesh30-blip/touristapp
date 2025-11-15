// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    // Use different base URL for development and production
    base: mode === 'development' ? '/' : '/small-tourist-app/',
    server: {
      port: 5173,
      strictPort: true,
      host: true,
      origin: 'http://localhost:5173'
    },
    define: {
      'process.env': {}
    }
  }
})