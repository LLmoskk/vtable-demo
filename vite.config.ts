import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 部署配置
  base: process.env.NODE_ENV === 'production' ? '/vtable-demo/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // 确保构建产物的路径正确
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          vtable: ['@visactor/vtable', '@visactor/react-vtable']
        }
      }
    }
  }
})
