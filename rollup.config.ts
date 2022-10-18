import babel from '@rollup/plugin-babel';
import localResolve from 'rollup-plugin-local-resolve';
import typescript from '@rollup/plugin-typescript';

const config = {
  input: 'src/index.ts',
  output: {
    dir: 'lib',
    format: 'umd',
  },
  plugins: [
    babel({babelHelpers: 'bundled'}),
    localResolve(),
    typescript()
  ],
};

export default config;
