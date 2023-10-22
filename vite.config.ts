import { defineConfig } from 'vite';
import aurelia from '@aurelia/vite-plugin';
import path from 'path';
import typescript from '@rollup/plugin-typescript';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import * as packageJson from './package.json';

export default defineConfig({
    plugins: [
        aurelia(),
    ],
    build: {
        manifest: true,
        minify: true,
        reportCompressedSize: true,
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: '@worm425/betsy-web-components',
            fileName: 'index',
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            external: Object.keys(packageJson.peerDependencies),
            plugins: [
                typescriptPaths({
                    preserveExtensions: true,
                }),
                typescript({
                    sourceMap: false,
                    declaration: true,
                    outDir: 'dist',
                    exclude: ['**/__tests__'],
                    tsconfig: './tsconfig.build.json',
                }),
            ],
        },
    },
});
