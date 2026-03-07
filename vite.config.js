import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/dddang/',
  server: {
    host: true,
    proxy: {
      // 토지 실거래가 API (국토교통부, data.go.kr) — CORS 우회
      '/api/land-trade': {
        target: 'http://apis.data.go.kr',
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(
            /^\/api\/land-trade/,
            '/1613000/RTMSDataSvcLandTrade/getRTMSDataSvcLandTrade'
          ),
      },
      // 개별공시지가 API (V-World)
      '/api/vworld': {
        target: 'https://api.vworld.kr',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/vworld/, ''),
      },
    },
  },
})
