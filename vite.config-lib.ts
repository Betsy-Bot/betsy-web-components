import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { resolve } from 'path';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import { defineConfig, Plugin, splitVendorChunkPlugin } from 'vite';

export default defineConfig({
  publicDir: false,
  build: {
    rollupOptions: {
      plugins: [nodePolyfills() as Plugin],
      output: {
        inlineDynamicImports: true,
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    outDir: 'scripts/update-chart-data',
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, './src/firebase.ts'),
      name: 'index',

      fileName: 'index',
      formats: ['es'],
    },
  },
  plugins: [splitVendorChunkPlugin()],
  define: {
    'process.env': process.env,
  },
  envPrefix: 'KOL',
  resolve: {
    alias: {
      stream: 'stream-browserify',
      zlib: 'browserify-zlib',
      util: 'util',
      Buffer: 'buffer',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: false,
        }),
      ],
    },
  },
});
