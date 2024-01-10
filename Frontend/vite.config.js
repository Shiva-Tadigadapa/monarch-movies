// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig(() => {
//   return {
//     build: {
//       outDir: 'build',
//     },
//     server: {
//       host: 'localhost',
//       port: 3000,
//     },
//     plugins: [react()],
//   };
// });
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
    },
  },
 
})