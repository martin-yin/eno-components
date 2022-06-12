import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import packageJSON from "./package.json"
import path from "path"

const globals = {
  react: 'React',
  antd: 'antd'
};
const external = Object.keys(globals);
const esExtelrnals = [...external,  /@babel\/runtime/, ...Object.keys(packageJSON.dependencies)];
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

// Babel配置
const babelOptions = {
  exclude: 'node_modules/**',
  extensions,
  babelHelpers: 'runtime',
  ignore: ['node_modules/**'],
  presets: [
    ['@babel/preset-env', { modules: false }],
    ['@babel/preset-react'],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
    ]
  ]
}

const commonPlugins = [
  babel(babelOptions),
  resolve({
    browser: true,
    extensions,
  }),
  commonjs(),
]

const buildConf = (options) => Object.assign({}, commonConf, options)

const getPath = (_path) => path.resolve(__dirname, _path)

const outputMap = [
  {
    file: packageJSON.main, // 通用模块
    format: 'umd',
    name: packageJSON.name,
    globals
  },
  {
    file: packageJSON.module, // es 模块
    format: 'es',
    name: packageJSON.name,
    globals
  }
];

const commonConf = {
  input: getPath('./src/file-libray/index.ts'),
  plugins: [
    ...commonPlugins,
  ],
  external: esExtelrnals
}


export default outputMap.map((output) => {
  output.format === 'umd' ? external : esExtelrnals
  return buildConf({ output: { name: packageJSON.name,...output } }
)})