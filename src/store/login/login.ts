import router from '@/router'
import { accountLogin } from '@/service/modules/login'
import { LocalCache } from '@/utils/cache'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'

const TOKEN = 'token'

// console.log(LocalCache.getCache(TOKEN))

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    token: LocalCache.getCache(TOKEN),
    name: ''
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

        router.push('/').then(() => {
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
