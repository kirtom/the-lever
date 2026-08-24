import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Relative asset paths so the same build works unmodified at a GitHub Pages
  // project path (kirtom.github.io/the-lever/) and, later, at the apex of a
  // custom domain (thelever.help/) — no base-path change needed when the
  // domain switches over.
  base: './',
  plugins: [react()],
});
