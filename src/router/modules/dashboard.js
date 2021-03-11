import Layout from '@/layout'

const dashboard = {
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/index'),
    meta: { title: '分析看板', icon: 'dashboard' }
  }, {
    path: 'dashboard/editor/:id(\\d+)',
    component: () => import('@/views/dashboard/editor'),
    name: 'editBoard',
    meta: { title: '编辑看板', noCache: true, activeMenu: '/dashboard' },
    hidden: true
  }, {
    path: 'dashboard/kanbanList',
    component: () => import('@/views/dashboard/kanbanList'),
    name: 'kanbanList',
    meta: { title: '看板库', noCache: true, activeMenu: '/dashboard' },
    hidden: true
  }, {
    path: 'dashboard/create',
    component: () => import('@/views/dashboard/create'),
    name: 'createBoard',
    meta: { title: '创建看板', noCache: true, activeMenu: '/dashboard' },
    hidden: true
  }]
}
export default dashboard
