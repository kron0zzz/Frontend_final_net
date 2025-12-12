import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://apifinal2-bsgcdscjcbe0dbht.mexicocentral-01.azurewebsites.net',
        changeOrigin: true,
        secure: false, // si tu backend usa HTTPS con certificado válido, esto puede ser true
      }
    }
  }
})
