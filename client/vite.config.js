import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: '../',
  
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: true,
  },
  
  // Development server configuration
  server: {
    port: 3000,           // Change port from default 5173 to 3000
    open: true,           // Automatically open browser
    host: true,           // Allow external connections
  },
  
  // Build configuration
  build: {
    emptyOutDir: true, // Clear output directory before build
    outDir: 'dist',       // Output directory
    sourcemap: true,      // Generate source maps for debugging
    
    // Rollup options for bundle optimization
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['lucide-react']
        }
      }
    },
    
    // Asset optimization
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
    
    // CSS optimization
    cssCodeSplit: true,      // Split CSS into separate files
  },
  
  // Path aliases for cleaner imports (optional)
  resolve: {
    alias: {
      '@': '/src',           // Use @ as alias for src directory
      '@components': '/src/components',
      '@styles': '/src/styles',
      '@pages': '/src/components/Pages'
    }
  },
  
  // Preview server configuration (for npm run preview)
  preview: {
    port: 4173,
    open: true
  },
  
  // Environment variables prefix
  envPrefix: 'VITE_',
  
  // Base public path (important for deployment)
  base: '/',  // Change to '/personal-portfolio/' if deploying to GitHub Pages subdirectory
})