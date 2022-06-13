import path from 'path';
export function resolve(...paths) {
  return path.resolve(__dirname, '..', ...paths);
}

export default {
  title: 'Eno Components',
  mode: 'site',
  logo: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  metas: [
    {
      name: 'theme-color',
      content: '#1890ff',
    },
  ],
  resolve: {
    includes: ['src','docs'],
  },
  navs: [
    null,
    {
      title: 'Github',
      path: 'https://github.com/martin-yin/eno-components',
    },
  ],
  base: '/eno-components',
  publicPath: '/eno-components/',
  hash: true,
  theme: {
    '@s-site-menu-width': '258px',
  },
  esbuild: {},
  ignoreMomentLocale: true,
  headScripts: ['https://gw.alipayobjects.com/os/antfincdn/fdj3WlJd5c/darkreader.js'],
  externals: { darkreader: 'window.DarkReader' },
  mfsu:{},
};
