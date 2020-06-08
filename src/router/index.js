import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/components/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: 'login' */ '../views/login/index'),
    hidden: true,
  },
]

export const asyncRouterMap = {
  0: {
    path: '',
    component: Layout,
    // redirect: '/filing',
    // alwaysShow: false,
    // meta: { title: '项目管控', icon: '' },
    children: [],
  },
  ldgl: {
    path: '/hole',
    component: () => import(/* webpackChunkName: 'hoel' */ '../views/hole'),
    name: 'Hole',
    meta: { title: '漏洞管理', icon: 'loophole' },
  },
  zcgl: {
    path: '/assets',
    component: () => import(/* webpackChunkName: 'assets' */ '../views/assets'),
    name: 'Assets',
    meta: { title: '资产管理', icon: 'assets' },
  },
  xtsz: {
    path: '/system',
    component: () => import(/* webpackChunkName: 'system' */ '../views/system'),
    name: 'System',
    meta: { title: '系统管理', icon: 'system' },
  },
}

const router = new VueRouter({
  routes,
})

export default router
