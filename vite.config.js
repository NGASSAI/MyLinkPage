import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuration Vite pour le développement local et le proxy API vers le backend Express
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
