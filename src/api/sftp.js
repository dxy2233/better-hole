import request from '@/utils/request'

/**
 * @description 下载文件
 */
export function download(path) {
  return request({
    url: '/sftp/download',
    method: 'get',
    responseType: 'blob',
    params: { path },
  })
}
