import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/klingai': {
        target: 'https://api.klingai.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/klingai/, ''),
        secure: false,
      },
    },
  },
})
