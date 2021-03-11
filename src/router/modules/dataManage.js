import Layout from '@/layout'

const dataManage = {
  path: '/dataManage/',
  component: Layout,
  redirect: '/dataManage/eventAttribute',
  name: '数据管理',
  alwaysShow: true,
  meta: { title: '数据管理', icon: 'form' },
  children: [
    {
      path: 'eventAttribute',
      name: 'eventAttribute',
      component: () => import('@/views/dataManage/eventAttribute'),
      meta: { title: '事件属性' }
    },
    {
      path: 'userAttribute',
      name: 'userAttribute',
      component: () => import('@/views/dataManage/userAttribute'),
      meta: { title: '用户属性' }
    },
    {
      path: 'statisticalData',
      name: 'statisticalData',
      component: () => import('@/views/dataManage/statisticalData'),
      meta: { title: '统计数据' }
    }
  ]
}

export default dataManage
