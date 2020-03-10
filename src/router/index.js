import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardIndex from '../views/dashboard/DashboardIndex'
import Login from '../views/Login'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    name: 'DashboardIndex',
    component: DashboardIndex,
    // children: [
    //   // Dashboard
    //   {
    //     name: 'Dashboard',
    //     path: '',
    //     component: () => import('@/views/dashboard/Dashboard'),
    //   },
    // ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
