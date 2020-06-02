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
 * @description 操作系统 中间件 数据库 类型列表
 */
export function getDeviceOsList() {
  return request({
    url: '/device/getDeviceOsList',
    method: 'get',
  })
}

/**
 * @description 设备类型列表
 */
export function getDeviceTypeList() {
  return request({
    url: '/device/getDeviceTypeList',
    method: 'get',
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

/**
 * @description 保存设备信息
 * @param id ID
 * @param deviceName 设备名称
 * @param deviceSort 设备类型
 * @param deviceType 设备厂家/型号
 * @param position 机房位置
 * @param cabinetNumber 机柜编号
 * @param systemVersion 操作系统版本
 * @param midVersion 中间件版本
 * @param dbVersion 数据库版本
 * @param ipAddress IP地址
 * @param port 端口
 * @param url 应用WEB URL地址
 * @param remark 备注
 */
export function save(data) {
  return request({
    url: '/device/save',
    method: 'post',
    data,
  })
}
