import { defineConfig } from 'dumi';
const repo = 'eno-components';
export default defineConfig({
  title: repo,
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
  navs: [
    null,
    {
      title: 'Github',
      path: `https://github.com/martin-yin/${repo}`,
    },
  ],
  base: `/${repo}/`,
  publicPath: `/${repo}/`,
  hash: true,
  theme: {
    '@s-site-menu-width': '258px',
  },
  esbuild: {},
  ignoreMomentLocale: true,
  headScripts: ['https://gw.alipayobjects.com/os/antfincdn/fdj3WlJd5c/darkreader.js'],
  externals: { darkreader: 'window.DarkReader' },
  mfsu:{},
});
