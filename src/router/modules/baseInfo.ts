const router = {
  path: '/main/baseInfo',
  name: 'baseInfo',
  component: () => import('@/views/baseInfo/baseInfo.vue'),
  meta: { title: '基本信息' }
}

export default router
