import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    base: process.env.NODE_ENV === 'production' ? '/vtable-demo/' : '/',
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      // 确保构建产物的路径正确
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'vendor'
              }
              if (id.includes('@visactor')) {
                return 'vtable'
              }
            }
          }
        }
      }
    }
  }
})
