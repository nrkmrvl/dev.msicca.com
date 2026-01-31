import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ['node_modules'],
        importer: function(url, prev) {
          // Handle ~ prefixed imports
          if (url.startsWith('~')) {
            return { file: url.slice(1) };
          }
          return null;
        }
      }
    }
  }
})
