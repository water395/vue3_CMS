const router = {
  path: 'system',
  component: () => {},
  // hidden: true,
  children: [
    {
      path: 'system/user',
      name: 'systemUser',
      component: () => import('@/views/system/user/systemUser.vue'),
      meta: { title: '用户管理' }
    },
    {
      path: 'system/role',
      name: 'systemRole',
      component: () => import('@/views/system/role/systemRole.vue'),
      meta: { title: '角色管理' }
    },
    {
      path: 'system/menu',
      name: 'systemMenu',
      component: () => import('@/views/system/menu/systemMenu.vue'),
      meta: { title: '菜单管理' }
    }
  ]
}

export default router
