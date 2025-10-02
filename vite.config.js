import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '~hooks': path.resolve(__dirname, './src/hooks'),
      '~assets': path.resolve(__dirname, './src/assets'),
      '~components': path.resolve(__dirname, './src/components'),
      '~utils': path.resolve(__dirname, './src/utils'),
      '~services': path.resolve(__dirname, './src/services'),
      '~helpers': path.resolve(__dirname, './src/helpers'),
      '~pages': path.resolve(__dirname, './src/pages'),
      '~contexts': path.resolve(__dirname, './src/contexts'),
      '~styles': path.resolve(__dirname, './src/styles'),
      '~firebase': path.resolve(__dirname, './src/firebase'),
    },
  },
})
