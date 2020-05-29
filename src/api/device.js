import request from '@/utils/request'

/**
 * @description 删除设备
 */
export function deleteDeviceById(id) {
  return request({
    url: '/device/deleteDeviceById',
    method: 'get',
    params: { id },
  })
}

/**
 * @description 分页条件查询设备列表
 * @param startPage 页面编号
 * @param pageSize 页面大小
 * @param systemId 信息系统id
 * @param deviceName 设备名称
 * @param deviceSort 设备类型
 * @param deviceType 设备厂家/型号
 */
export function getDeviceList(data) {
  return request({
    url: '/device/getDeviceList',
    method: 'post',
    data,
  })
}

/**
 * @description 导入设备
 */
export function importDevice(data) {
  return request({
    url: '/device/importDevice',
    method: 'post',
    data,
  })
}
