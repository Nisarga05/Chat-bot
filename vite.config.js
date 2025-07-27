import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/Chat-bot/", // 👈 Add this line
  plugins: [react()],
})
