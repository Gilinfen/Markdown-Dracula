import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/index.mjs',
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [
    json(),
    resolve(),
    typescript({
      tsconfig: './tsconfig.json' // tsconfig.json 的路径,
    }),
    commonjs({
      include: /node_modules/,
      namedExports: {
        'node_modules/nanoid/index.js': ['nanoid']
      }
    })
  ],
  external: ['tslib', 'nanoid'] // 声明外部依赖项
}
