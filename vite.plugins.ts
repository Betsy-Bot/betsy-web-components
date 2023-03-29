import { IOptionalPreprocessOptions, preprocess } from '@aurelia/plugin-conventions';

import { createFilter } from '@rollup/pluginutils';
import * as rollupPluginutils from 'rollup-pluginutils';
import { Plugin } from 'vite';

export function au2({ include, exclude, ...options }: { include?: string; exclude?: string; pre?: boolean } & IOptionalPreprocessOptions) {
  const filter = createFilter(include, exclude);

  return {
    name: 'au2',
    enforce: options.pre ? 'pre' : 'post',
    transform: function transform(code: string, id: string) {
      if (!filter(id)) return;
      const result = preprocess(
        {
          path: id,
          contents: code,
        },
        { hmr: true, hmrModule: 'import.meta', ...options },
      )?.code;
      return { code: result ?? code };
    },
  } as Plugin;
}

export const rawHtml = () => {
  const filter = rollupPluginutils.createFilter('**/*.ts', undefined);
  return {
    name: 'raw',
    transform: function transform(code: string, id: string) {
      if (!filter(id)) return;
      if (code.includes('__au2ViewDef')) return;
      code = code.replaceAll(/(import .* from .*)\.html/g, '$1.html?raw');
      return { code };
    },
  };
};
