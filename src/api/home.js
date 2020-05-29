import request from '@/utils/request'

/**
 * @description home
 */
export function () {
  return request({
    url: '/',
    method: 'get',
  })
}
