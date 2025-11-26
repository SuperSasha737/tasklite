import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const repoName = "tasklite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `/${repoName}`
})
