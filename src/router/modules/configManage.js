import Layout from '@/layout'

const configManage = {
  path: '/configManage/',
  component: Layout,
  redirect: '/configManage/eventAttribute',
  name: '配置管理',
  alwaysShow: true,
  meta: { title: '配置管理', icon: 'nested' },
  children: [
    {
      path: 'event',
      name: 'event',
      component: () => import('@/views/configManage/event'),
      meta: { title: '事件' }
    },
    {
      path: 'appManage',
      name: 'appManage',
      component: () => import('@/views/configManage/appManage'),
      meta: { title: '应用管理' }
    },
    {
      path: 'userManage',
      name: 'userManage',
      component: () => import('@/views/configManage/userManage'),
      meta: { title: '系统用户管理' }
    },
    {
      path: 'roleManage',
      name: 'roleManage',
      component: () => import('@/views/configManage/roleManage'),
      meta: { title: '角色管理' }
    },
    {
      path: 'autManage',
      name: 'autManage',
      component: () => import('@/views/configManage/autManage'),
      meta: { title: '菜单接口管理' }
    },
    {
      path: 'dailyManage',
      name: 'dailyManage',
      component: () => import('@/views/configManage/dailyManage'),
      meta: { title: '日志管理' }
    },
    {
      path: 'defendManage',
      name: 'defendManage',
      component: () => import('@/views/configManage/defendManage'),
      meta: { title: '维护配置' }
    }
  ]
}

export default configManage
