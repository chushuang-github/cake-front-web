import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  antd: {
    dark: false,
    compact: true,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  fastRefresh: {},
});
