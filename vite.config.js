import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/categories': {
        target: 'http://localhost:5190',
        changeOrigin: true,
        // Rewrite is niet nodig als je fetch exact '/categories' is
      },
    },
  },
})

