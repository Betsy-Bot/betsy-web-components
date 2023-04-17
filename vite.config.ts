import { defineConfig } from 'vite';
import aurelia from '@aurelia/vite-plugin';

export default defineConfig({
  server: {
    port: 9500,
    strictPort: true,
  },
  plugins: [aurelia()],
});

