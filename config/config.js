import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  // antd组件库配置
  antd: {
    dark: false,
    compact: true,
  },
  // layout布局
  layout: {
    name: '蛋糕管理平台',
    locale: true,
    layout: 'side',
  },
  // node_modules下面文件的编译模式
  nodeModulesTransform: {
    type: 'none',
  },
  // 对useRequest请求函数，返回的数据格式不做限制
  // 如果不加下面的配置，需要后台返回的数据格式必须要满足 { success: boolean, data: any} 这种格式数据
  request: {
    dataField: '',
  },
  // dva配置
  dva: {
    immer: true,
    hmr: false,
  },
  // 路由配置
  routes,
  fastRefresh: {},
});
