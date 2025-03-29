import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  
  server: {
    host: "::",
    port: 8080,
    strictPort: true, // Ensure port is strictly 8080
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          clerk: ["@clerk/clerk-react"],
          react: ["react", "react-dom", "react-router-dom"],
          ui: ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu"], // Group UI libs
        },
      },
    },
  },
  base: "./", // Relative base path for proper asset loading
  preview: {
    port: 8080,
    strictPort: true,
  },
}));