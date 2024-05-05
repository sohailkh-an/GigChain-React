import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCommonjs()

  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Replace with your backend server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
