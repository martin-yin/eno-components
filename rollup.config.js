import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import packageJSON from './package.json'
import path from 'path'

const globals = {
  react: 'React',
  antd: 'antd',
  '@ant-design/icons': 'icons'
}

const external = Object.keys(globals)
// https://www.npmjs.com/package/@rollup/plugin-babel/v/5.2.1#babelhelpers
const esExtelrnals = [...external, /@babel\/runtime/, ...Object.keys(packageJSON.dependencies)]
const extensions = ['.js', '.jsx', '.ts', '.tsx']

// Babel配置
const babelOptions = {
  exclude: 'node_modules/**',
  extensions,
  babelHelpers: 'runtime',
  ignore: ['node_modules/**'],
  presets: [['@babel/preset-env', { modules: false }], ['@babel/preset-react'], '@babel/preset-typescript'],
  plugins: [['@babel/plugin-transform-runtime']]
}

const buildConf = options => Object.assign({}, commonConfig, options)
const getPath = _path => path.resolve(__dirname, _path)

const outputMap = [
  {
    file: packageJSON.main, // 通用模块
    format: 'umd',
    name: packageJSON.name,
    globals
  },
  {
    dir: packageJSON.module, // es 模块
    format: 'es',
    name: packageJSON.name,
    preserveModules: true,
    globals
  }
]

const commonConfig = {
  input: getPath('./src/file-libray/index.ts'),
  plugins: [
    babel(babelOptions),
    resolve({
      browser: true,
      extensions
    }),
    commonjs()
  ]
}

export default outputMap.map(output => {
  return buildConf({
    output: { name: packageJSON.name, ...output },
    external: output.format === 'umd' ? external : esExtelrnals
  })
})
