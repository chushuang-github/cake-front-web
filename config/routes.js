export default [
  {
    path: '/',
    component: '@/pages/index',
    // 路由配置里面写上name属性，就会集成到左侧导航菜单里面 (umi内置@umijs/plugin-layout插件)
    // hideInMenu: true，路由里面加上这个配置，配置的路由就不会出现在左侧的导航菜单上面
    name: '数据统计',
    icon: 'BarChartOutlined',
  },
  {
    path: '/area',
    name: '配送范围',
    component: '@/pages/area',
    icon: 'HeatMapOutlined',
  },
  {
    path: '/login',
    component: '@/pages/login',
    name: '登录',
    // layout为false，切换到login路由，对应的组件不是由layout控制的，而是一个单独的页面
    hideInMenu: true,
    layout: false,
  },
  {
    path: '/stu',
    name: '学员管理',
    icon: 'UsergroupAddOutlined',
    routes: [
      {
        path: '/stu/list',
        component: '@/pages/stu/list',
        name: '学员列表',
      },
      {
        path: '/stu/pub',
        component: '@/pages/stu/pub',
        name: '学员录入',
      },
    ],
  },
  {
    path: '/category',
    name: '分类管理',
    icon: 'AppstoreOutlined',
    routes: [
      {
        path: '/category/list',
        component: '@/pages/category/list',
        name: '分类列表',
      },
      {
        path: '/category/pub',
        component: '@/pages/category/pub',
        name: '分类发布',
      },
    ],
  },
  {
    path: '/banner',
    name: '轮播管理',
    icon: 'ClusterOutlined',
    routes: [
      {
        path: '/banner/list',
        component: '@/pages/banner/list',
        name: '轮播列表',
      },
      {
        path: '/banner/pub',
        component: '@/pages/banner/pub',
        name: '轮播发布',
      },
    ],
  },
  {
    path: '/shop',
    name: '商品管理',
    icon: 'ShopOutlined',
    routes: [
      {
        path: '/shop/list',
        component: '@/pages/shop/list',
        name: '商品列表',
      },
      {
        path: '/shop/pub',
        component: '@/pages/shop/pub',
        name: '商品发布',
      },
    ],
  },
  {
    path: '/dva',
    name: '状态管理',
    icon: 'DatabaseOutlined',
    routes: [
      {
        path: '/dva/a',
        component: '@/pages/dva/ComponentA',
        name: '组件A',
      },
      {
        path: '/dva/b',
        component: '@/pages/dva/ComponentB',
        name: '组件B',
      },
    ],
  },
  {
    path: '/system',
    name: '系统设置',
    icon: 'SettingOutlined',
    routes: [
      {
        path: '/system/role',
        component: '@/pages/system/roleMenu',
        name: '角色管理',
      },
      {
        path: '/system/user',
        component: '@/pages/system/userMenu',
        name: '账号管理',
      },
    ],
  },
];
