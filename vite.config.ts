import { defineConfig } from 'vite';
import aurelia from '@aurelia/vite-plugin';
import path from 'path';
import typescript from '@rollup/plugin-typescript';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import commonjs from 'vite-plugin-commonjs'
import swc from 'unplugin-swc'

export default defineConfig({
    plugins: [
        commonjs(),
        aurelia(),
        swc.vite()
    ],
    build: {
        manifest: true,
        minify: true,
        reportCompressedSize: true,
        sourcemap: true,
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: '@worm425/betsy-web-components',
            fileName: 'index',
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            external: /node_modules\/.*/,
            plugins: [
                aurelia(),
                commonjs(),
                typescriptPaths({
                    preserveExtensions: true,
                }),
                typescript({
                    sourceMap: true,
                    declaration: true,
                    outDir: 'dist',
                    exclude: ['**/__tests__'],
                    tsconfig: './tsconfig.build.json',
                }),
            ],
        },
    },
});
