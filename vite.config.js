import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // Environment değişkenlerini yükle
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      // Environment değişkenlerini global olarak erişilebilir yap
      __VITE_API_URL__: JSON.stringify(env.VITE_API_URL || 'http://localhost:5000/api'),
      __VITE_API_KEY__: JSON.stringify(env.VITE_API_KEY || 'your-api-key-here'),
    },
    server: {
      port: 3000,
      open: true
    },
    // Environment değişkenlerini client-side'da erişilebilir yap
    envPrefix: 'VITE_'
  }
})
