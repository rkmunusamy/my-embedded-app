import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Shim process.env to avoid errors in the browser.
  define: {
    'process.env': {}
  },
  build: {
    lib: {
      entry: 'src/main.jsx',
      name: 'BookingWidget', // global variable name on window
      formats: ['iife'],     // IIFE format for direct browser inclusion
      fileName: () => 'booking-widget.js'
    },
    rollupOptions: {
      // Do not mark react and react-dom as external so they are bundled.
    }
  }
})
