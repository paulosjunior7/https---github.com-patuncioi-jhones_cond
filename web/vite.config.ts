import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "build",
    // Otimizações de build
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log em produção
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // Dividir chunks para melhor cache
        manualChunks: {
          vendor: ["react", "react-dom"],
          ui: ["lucide-react"],
        },
        // Otimizar nomes dos arquivos
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
    // Otimizações de assets
    assetsInlineLimit: 4096, // Inline assets pequenos
    chunkSizeWarningLimit: 1000, // Aumentar limite de warning
  },
  // Otimizações de desenvolvimento
  server: {
    hmr: {
      overlay: false, // Desabilitar overlay de erro para melhor performance
    },
  },
  // Otimizações de CSS
  css: {
    devSourcemap: false, // Desabilitar sourcemap em desenvolvimento
  },
  // Otimizações de dependências
  optimizeDeps: {
    include: ["react", "react-dom", "lucide-react"],
    exclude: ["@vite/client", "@vite/env"],
  },
  // Configurações de preview
  preview: {
    port: 4173,
    strictPort: true,
  },
});
