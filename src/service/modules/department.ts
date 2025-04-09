import request from '../request'

//新增
export function departmentAdd(data: object) {
  return request({
    url: '/api/department/departmentAdd',
    method: 'post',
    data
  })
}

export function departmentUpdate(data: object) {
  return request({
    url: '/api/department/departmentUpdate',
    method: 'post',
    data
  })
}

//删除
export function departmentDelete(department_id: number) {
  return request({
    url: '/api/department/departmentDelete',
    method: 'get',
    params: { department_id }
  })
}

//列表
export function departmentList(id: number) {
  return request({
    url: '/api/department/departmentList',
    method: 'get',
    params: { id }
  })
}
