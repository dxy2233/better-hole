import request from '@/utils/request'

/**
 * @description 获取登录用户信息
 */
export function getUser() {
  return request({
    url: '/loginCtrl/getUser',
    method: 'get',
  })
}

/**
 * @description 生成验证码
 */
export function getVerify() {
  return request({
    url: '/loginCtrl/getVerify',
    method: 'get',
  })
}
