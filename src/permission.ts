// import { ElMessage } from 'element-plus'
import router from './router'
import 'element-plus/theme-chalk/el-message.css'
import { LocalCache } from './utils/cache'
import useLoginStore from './store/login/login'

// 导航守卫
// 参数to（跳转的位置）/from 从哪里来
const TOKEN = 'token'
router.beforeEach((to, from, next: any) => {
  const hasToken = LocalCache.getCache(TOKEN)
  console.log('路由跳转', to, from)
  //判断是否有token
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: to.query.redirect || '/' })
    } else {
      if (useLoginStore().isGETPermission) {
        next()
      } else {
        useLoginStore()
          .getUserPermission()
          .then(() => {
            next({ ...to })
          })
      }
    }
  } else {
    next()
  }
})
