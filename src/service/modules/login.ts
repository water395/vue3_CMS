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

export function getUserPermissions(id: number) {
  return request({
    url: '/api/user/userPermissions',
    method: 'get',
    params: { id }
  })
}

export function getUserMeunList(id: number) {
  return request({
    url: '/api/user/userMenu',
    method: 'get',
    params: { id }
  })
}
