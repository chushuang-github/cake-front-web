export default [
  {
    path: '/',
    component: '@/pages/index',
    // 路由配置里面写上name属性，就会集成到左侧导航菜单里面 (umi内置@umijs/plugin-layout插件)
    name: '数据统计'
  },
  {
    path: '/stu',
    name: '学员管理',
    routes: [
      {
        path: '/stu/list',
        component: '@/pages/stu/list',
        name: '学员列表'
      },
      {
        path: '/stu/pub',
        component: '@/pages/stu/pub',
        name: '学员录入'
      }
    ]
  },
  {
    path: '/category',
    name: '分类管理',
    routes: [
      {
        path: '/category/list',
        component: '@/pages/category/list',
        name: '分类列表'
      },
      {
        path: '/category/pub',
        component: '@/pages/category/pub',
        name: '分类发布'
      }
    ]
  }
]
