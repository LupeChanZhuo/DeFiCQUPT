/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/layout'

const defiRouter = {
  path: '/defilist',
  component: Layout,
  children: [
    {

      path: 'index',
      component: () => import('@/views/defilist/index'),
      name: 'DeFiList',
      meta: { title: '项目列表', icon: 'list', noCache: true }
    }
  ]
}

export default defiRouter
