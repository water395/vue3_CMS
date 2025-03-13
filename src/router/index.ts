import { createRouter, createWebHashHistory } from 'vue-router'

const common = [
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
    component: () => import('@/views/main/mainView.vue')
  },
  {
    path: '/:patchMatch(.*)',
    component: () => import('@/views/not-found/notFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  //映射关系:path => component
  routes: common
})

export default router
