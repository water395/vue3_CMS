const router = {
  path: '/main/system',
  component: () => {},
  // hidden: true,
  children: [
    {
      path: '/main/system/user',
      name: 'systemUser',
      component: () => import('@/views/system/user/systemUser.vue'),
      meta: { title: '用户管理' }
    },
    {
      path: '/main/system/department',
      name: 'systemDepartment',
      component: () => import('@/views/system/department/systemDepartment.vue'),
      meta: { title: '部门管理' }
    }
    // {
    //   path: 'main/system/role',
    //   name: 'systemRole',
    //   component: () => import('@/views/system/role/systemRole.vue'),
    //   meta: { title: '角色管理' }
    // },
    // {
    //   path: 'main/system/menu',
    //   name: 'systemMenu',
    //   component: () => import('@/views/system/menu/systemMenu.vue'),
    //   meta: { title: '菜单管理' }
    // }
  ]
}

export default router
