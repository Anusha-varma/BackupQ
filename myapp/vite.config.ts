import { defineConfig, loadEnv } from "vite";
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
      server: {
        host: "::",
        port: 8080,
      },
    plugins: [react(),tailwindcss()],
    // Make env variables available to the client
    define: {
      'process.env': env
    }
  }
});
