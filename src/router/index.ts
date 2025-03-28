import { getLocalViewRoute } from '@/utils/router'
import { createRouter, createWebHashHistory } from 'vue-router'

const commonRouter = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    component: () => import('@/views/login/loginView.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/mainView.vue')
  },
  {
    path: '/:patchMatch(.*)',
    component: () => import('@/views/not-found/notFound.vue')
  }
]

export const viewRoute = getLocalViewRoute()

const router = createRouter({
  history: createWebHashHistory(),
  //映射关系:path => component
  routes: commonRouter
})

export default router
