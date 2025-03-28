const router = {
  path: 'content',
  component: () => {},
  // hidden: true,
  children: [
    {
      path: 'content/title',
      name: 'contentTitle',
      component: () => import('@/views/content/title/contentTitle.vue'),
      meta: { title: '标签管理' }
    }
  ]
}

export default router
