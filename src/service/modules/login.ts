import request from '../request'

export function accountLogin(data: object) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

export function phoneLogin(data: object) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}
