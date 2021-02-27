import Layout from '@/layout'

const userClustering = {
  path: '/userClustering/',
  component: Layout,
  redirect: '/userClustering/index',
  name: '用户分群',
  alwaysShow: true,
  meta: { title: '用户分群', icon: 'form' },
  children: [
    {
      path: 'index',
      name: '分群查询',
      component: () => import('@/views/userClustering/index'),
      meta: { title: '分群查询' }
    },
    {
      path: 'editor/:id(\\d+)',
      component: () => import('@/views/userClustering/editor'),
      name: 'EditUserGroup',
      meta: { title: '编辑分群', noCache: true, activeMenu: '/userClustering/index' },
      hidden: true
    }, {
      path: 'create',
      component: () => import('@/views/userClustering/create'),
      name: 'createUserGroup',
      meta: { title: '创建分群', noCache: true, activeMenu: '/userClustering/index' },
      hidden: true
    },
    {
      path: 'travelSearch',
      name: '轨迹查询',
      component: () => import('@/views/userClustering/travelSearch'),
      meta: { title: '轨迹查询' }
    }
  ]
}

export default userClustering
