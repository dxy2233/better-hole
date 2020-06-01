import request from '@/utils/request'

/**
 * @description 上传文件
 */
export function unzip(data) {
  return request({
    url: '/upload/unzip',
    method: 'post',
    data,
  })
}
