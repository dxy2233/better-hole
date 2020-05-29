import request from '@/utils/request'

/**
 * @description 查询所有字典值
 */
export function getDictionaryValue() {
  return request({
    url: '/dictionary/getDictionaryValue',
    method: 'get',
  })
}

/**
 * @description 根据key查询字典值
 */
export function getDictionaryValueByKey(key) {
  return request({
    url: '/dictionary/getDictionaryValueByKey',
    method: 'get',
    params: { key },
  })
}
