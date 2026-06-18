// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from "@tailwindcss/vite"
// import path from 'path'

// export default defineConfig({
//   assetsInclude: ['**/*.glb'],
//   plugins: [react(),
//             tailwindcss() 
//             ],
//   resolve: {
//     	    alias: {
//       		  "@": path.resolve(__dirname, "./src"),
//     	    },
//   	  }
// })


// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
  },
});