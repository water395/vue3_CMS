import axios from 'axios'
import { BASE_URL, TIME_OUT, ContentType } from '../config'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

axios.defaults.headers.post['Content-Type'] = ContentType
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

// 创建 Axios 实例
const service = axios.create({
  // 根据不同环境设置基础请求地址，可通过环境变量配置
  baseURL: BASE_URL,
  timeout: TIME_OUT // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 可以在这里添加一些公共的请求头信息，例如 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // 处理请求错误
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    // 这里假设接口返回的数据结构中有 code 和 message 字段
    if (res.code !== 200) {
      // 处理非成功响应
      ElMessage.error(res.message || '请求出错，请稍后重试')
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return response.data
    }
  },
  (error) => {
    // 处理响应错误
    console.error('响应错误:', error)
    let errorMessage = '请求出错，请稍后重试'
    if (error.response) {
      switch (error.response.status) {
        case 401:
          errorMessage = '未授权，请重新登录'
          // 可以在这里添加跳转到登录页的逻辑
          break
        case 404:
          errorMessage = '请求的资源不存在'
          break
        case 500:
          errorMessage = '服务器内部错误'
          break
      }
    }
    console.log(errorMessage)

    ElMessage.error(errorMessage)
    return Promise.reject(error)
  }
)

export default service
