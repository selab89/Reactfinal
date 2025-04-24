import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/categories': {
        target: 'http://localhost:3000', // <-- aangepast van 5190 naar 3000
        changeOrigin: true,
      },
    },
  },
})


