import Layout from '@/layout'

const dataAnalysis = {
  path: '/dataAnalysis/',
  component: Layout,
  redirect: '/dataAnalysis/eventAnalysis',
  name: '数据分析',
  alwaysShow: true,
  meta: { title: '数据分析', icon: 'el-icon-s-help' },
  children: [
    // 事件分析
    {
      path: 'eventAnalysis',
      name: 'eventAnalysis',
      component: () => import('@/views/dataAnalysis/index'),
      meta: { title: '事件分析' }
    },
    {
      path: 'eventAnalysis/editor/:id(\\d+)',
      component: () => import('@/views/dataAnalysis/editor'),
      name: 'EditEventAnalysis',
      meta: { title: '编辑事件分析', noCache: true, activeMenu: '/dataAnalysis/eventAnalysis' },
      hidden: true
    }, {
      path: 'eventAnalysis/create',
      component: () => import('@/views/dataAnalysis/create'),
      name: 'createEventAnalysis',
      meta: { title: '创建事件分析', noCache: true, activeMenu: '/dataAnalysis/eventAnalysis' },
      hidden: true
    },

    // 漏斗分析
    {
      path: 'funnelAnalysis',
      name: 'funnelAnalysis',
      component: () => import('@/views/dataAnalysis/index'),
      meta: { title: '漏斗分析' }
    },
    {
      path: 'funnelAnalysis/editor/:id(\\d+)',
      component: () => import('@/views/dataAnalysis/editor'),
      name: 'EditFunnelAnalysis',
      meta: { title: '编辑漏斗分析', noCache: true, activeMenu: '/dataAnalysis/funnelAnalysis' },
      hidden: true
    }, {
      path: 'funnelAnalysis/create',
      component: () => import('@/views/dataAnalysis/create'),
      name: 'createFunnelAnalysis',
      meta: { title: '创建漏斗分析', noCache: true, activeMenu: '/dataAnalysis/funnelAnalysis' },
      hidden: true
    },

    // 留存分析
    {
      path: 'retentionAnalysis',
      name: 'retentionAnalysis',
      component: () => import('@/views/dataAnalysis/index'),
      meta: { title: '留存分析' }
    },
    {
      path: 'retentionAnalysis/editor/:id(\\d+)',
      component: () => import('@/views/dataAnalysis/editor'),
      name: 'EditRetentionAnalysis',
      meta: { title: '编辑留存分析', noCache: true, activeMenu: '/dataAnalysis/retentionAnalysis' },
      hidden: true
    }, {
      path: 'retentionAnalysis/create',
      component: () => import('@/views/dataAnalysis/create'),
      name: 'createRetentionAnalysis',
      meta: { title: '创建留存分析', noCache: true, activeMenu: '/dataAnalysis/retentionAnalysis' },
      hidden: true
    },

    // 分布分析
    {
      path: 'distributionAnalysis',
      name: 'distributionAnalysis',
      component: () => import('@/views/dataAnalysis/index'),
      meta: { title: '分布分析' }
    },
    {
      path: 'distributionAnalysis/editor/:id(\\d+)',
      component: () => import('@/views/dataAnalysis/editor'),
      name: 'EditDistributionAnalysis',
      meta: { title: '编辑分布分析', noCache: true, activeMenu: '/dataAnalysis/distributionAnalysis' },
      hidden: true
    }, {
      path: 'distributionAnalysis/create',
      component: () => import('@/views/dataAnalysis/create'),
      name: 'createDistributionAnalysis',
      meta: { title: '创建分布分析', noCache: true, activeMenu: '/dataAnalysis/distributionAnalysis' },
      hidden: true
    }
  ]
}

export default dataAnalysis
