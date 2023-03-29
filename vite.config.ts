import { au2, rawHtml } from './vite.plugins';

import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, Plugin, splitVendorChunkPlugin } from 'vite';

export default defineConfig({
  server: {
    port: 9000,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      plugins: [nodePolyfills() as Plugin],
    },
    minify: 'terser',
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    target: 'es2022',
  },
  plugins: [
    au2({ include: 'src/**/*.ts', pre: true, hmr: true, enableConventions: false }),
    splitVendorChunkPlugin(),
    rawHtml(),
    visualizer({
      emitFile: true,
      gzipSize: true,
      filename: 'stats.html',
    }) as Plugin,
  ],
  define: {
    'process.env': process.env,
  },
  envPrefix: 'BWC',
  resolve: {
    alias: {
      stream: 'stream-browserify',
      zlib: 'browserify-zlib',
      util: 'util',
      http: 'http-browserify',
      https: 'https-browserify',
      Buffer: 'buffer',
    },
  },

  optimizeDeps: {
    esbuildOptions: {
      target: 'es2022',
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
