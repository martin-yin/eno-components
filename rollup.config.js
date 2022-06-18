import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import glob from 'glob'
import packageJSON from './package.json'
import path from 'path'
import fs from 'fs'
import postcss from 'rollup-plugin-postcss'

const globals = {
  react: 'React',
  antd: 'antd',
  '@ant-design/icons': 'icons'
}

const external = Object.keys(globals)
const esExtelrnals = [...external, /@babel\/runtime/, ...Object.keys(packageJSON.dependencies)]
const extensions = ['.js', '.jsx', '.ts', '.tsx']

const componentEnties = glob.sync('src/**/index.ts')
const entryInput = path.resolve('src/index.ts')
componentEnties.push(entryInput)

fs.rmSync('./es', { recursive: true, force: true })
fs.rmSync('./dist', { recursive: true, force: true })

// Babel配置
const babelOptions = {
  exclude: 'node_modules/**',
  extensions,
  babelHelpers: 'runtime',
  ignore: ['node_modules/**'],
  presets: [['@babel/preset-env', { modules: false }], ['@babel/preset-react'], '@babel/preset-typescript'],
  plugins: [['@babel/plugin-transform-runtime']]
}

/** @type{import('rollup').Plugin[] */
const plugins = [
  postcss({
    minimize: true,
    modules: false,
    use: {
      sass: null,
      stylus: null,
      less: { javascriptEnabled: true }
    },
    extract: true
  }),
  babel(babelOptions),
  resolve({
    browser: true,
    extensions
  }),
  commonjs(),
]

/** @type{import('rollup').OutputOptions[]}*/
const output = [
  {
    format: 'es',
    preserveModules: true,
    dir: 'es',
    globals
  },
  {
    format: 'umd',
    file: 'dist/index.js',
    name: packageJSON.name,
    globals: {
      ...globals
    }
  }
]

const configs = output.map(item => {
  /** @type{import('rollup').RollupOptions*/
  const config = {
    external: item.format === 'umd' ? external : esExtelrnals,
    input: item.format === 'umd' ? entryInput : componentEnties,
    output: item,
    plugins
  }
  return config
})

export default configs
