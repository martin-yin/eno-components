import { readdirSync } from 'fs';
import chalk from 'chalk';
import { join } from 'path';

const headPkgList = [];

const pkgList = readdirSync(join(__dirname, 'packages')).filter(
  (pkg) => pkg.charAt(0) !== '.' && !headPkgList.includes(pkg),
);

const alias = pkgList.reduce((pre, pkg) => {
  pre[`xu-${pkg}`] = join(__dirname, 'packages', pkg, 'src');
  return {
    ...pre,
  };
}, {});

const tailPkgList = pkgList
  .map((path) => [join('packages', path), join('packages', path, 'src'), join('packages', path, 'src', 'components')])
  .reduce((acc, val) => acc.concat(val), []);

const isProduction = process.env.NODE_ENV === 'production';

const isDeploy = process.env.SITE_DEPLOY === 'TRUE';

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
  alias: process.env === 'development' ? alias : {},
  resolve: {
    includes: [...tailPkgList, 'docs'],
  },
  navs: [
    null,
    {
      title: 'Github',
      path: 'https://github.com/martin-yin/eno-components',
    },
  ],
  analytics: isProduction
    ? {
        ga: 'UA-173569162-1',
      }
    : false,
  hash: true,
  ssr: isDeploy ? {} : undefined,
  exportStatic: {},
  targets: {
    chrome: 80,
    firefox: false,
    safari: false,
    edge: false,
    ios: false,
  },
  theme: {
    '@s-site-menu-width': '258px',
  },
  esbuild: {},
  ignoreMomentLocale: true,
  headScripts: ['https://gw.alipayobjects.com/os/antfincdn/fdj3WlJd5c/darkreader.js'],
  links:
    process.env.NODE_ENV === 'development'
      ? ['https://gw.alipayobjects.com/os/lib/antd/4.6.6/dist/antd.css']
      : [],
  externals: { darkreader: 'window.DarkReader' },
  webpack5: {},
  mfsu: !isDeploy ? {} : undefined,
  fastRefresh: {},
};
