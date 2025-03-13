export const TIME_OUT = 10000
export const ContentType = 'application/json;charset=UTF-8'

let BASE_URL = 'http://127.0.0.1:3636' //测试环境

if (import.meta.env.PROD) {
  BASE_URL = 'http://127.0.0.1:3636' //生产环境域名
}
console.log(`目前环境:`, import.meta.env)

export { BASE_URL }
