import request from '@/utils/request'

// 登陆
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data,
  })
}

// 注销
export function logout() {
  return request({
    url: '/logout',
    method: 'post',
  })
}
