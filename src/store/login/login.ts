import router, { viewRoute } from '@/router'
import { accountLogin, getUserPermissions } from '@/service/modules/login'
import { LocalCache } from '@/utils/cache'
import { buildTreeEfficient, traverseTree } from '@/utils/router'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'

const TOKEN = 'token'

interface userMenuInterface {
  id: string | number
  name: string | null
  type: number
  rule: string
  path: string | null
  icon: string
  sort: number
  children: userMenuInterface[] | null
  parentId: string | null | number
}

const useLoginStore = defineStore('login', {
  state: (): {
    token: string
    userInfo: any
    userMenu: userMenuInterface[]
    isGETPermission: boolean
    userPermissionRule: userMenuInterface[]
  } => ({
    token: LocalCache.getCache(TOKEN) ?? '',
    userInfo: {},
    userMenu: [],
    isGETPermission: false,
    userPermissionRule: []
  }),

  actions: {
    async loginAccountAction(account: any) {
      console.log(account)
      try {
        const loginResult: any = await accountLogin({
          username: account.username,
          password: account.password
        })
        this.token = loginResult.token
        LocalCache.setCache(TOKEN, this.token)
        this.getUserPermission()
        router.push('/main/baseInfo').then(() => {
          if (account.isRemPwd) {
            LocalCache.setCache('loginInfo', JSON.stringify(account))
          } else {
            LocalCache.removeCache('loginInfo')
          }

          ElMessage.success('登录成功')
        })
      } catch (error: any) {
        ElMessage.warning(error.message)
      }
    },

    async getUserPermission() {
      try {
        const res: any = await getUserPermissions(100)
        this.userPermissionRule = res.data.rule
        this.userMenu = buildTreeEfficient(this.userPermissionRule)
        this.isGETPermission = true

        //动态路由
        if (viewRoute.length > 0) {
          this.getPermissionsRoute()
        }
      } catch (error: any) {
        ElMessage.warning(error.message)
      }
    },

    getPermissionsRoute() {
      this.userPermissionRule.forEach((element) => {
        const res = traverseTree(element.id, viewRoute)
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        res && router.addRoute('main', res)
      })

      console.log(router.getRoutes(), '已经注册的路由')
    },

    async outLogin() {
      try {
        LocalCache.removeCache(TOKEN)

        router.push('/login').then(() => {
          ElMessage.success('退出成功')
        })
      } catch (error: any) {
        ElMessage.warning(error.message)
      }
    }
  }
})

export default useLoginStore
