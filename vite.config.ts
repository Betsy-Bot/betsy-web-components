import { defineConfig } from 'vite';
import aurelia from '@aurelia/vite-plugin';
import path from 'path';
import typescript from '@rollup/plugin-typescript';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import swc from 'unplugin-swc'
import * as packageJson from './package.json';

const external: Array<string | RegExp> = Object.keys(packageJson.peerDependencies).concat(Object.keys(packageJson.dependencies)).concat([/(\@material|devextreme)/] as any);

export default defineConfig({
    plugins: [
        aurelia({
            exclude: [
                '**/moo-accordion.**',
                '**/moo-banner.**',
                '**/moo-button.**',
                '**/moo-card.**',
                '**/moo-card-content.**',
                '**/moo-card-footer.**',
                '**/moo-tab.**',
                '**/moo-tab-bar.**',
                '**/moo-text-field.**',
                '**/moo-topbar.**'
            ]
        }),
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
            external,
            plugins: [
                typescriptPaths({
                    preserveExtensions: true,
                }),
                typescript({
                    sourceMap: true,
                    declaration: true,
                    outDir: 'dist',
                    exclude: ['**/__tests__'],
                    tsconfig: './tsconfig.build.json',
                })
            ],
        },
    },
});
