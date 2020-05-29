import request from '@/utils/request'

/**
 * @description 根据ID删除系统信息
 */
export function deleteById(id) {
  return request({
    url: '/system/deleteById',
    method: 'get',
    params: { id },
  })
}

/**
 * @description 根据系统查询系统
 */
export function getSystemListByOrgId(orgId) {
  return request({
    url: '/system/getSystemListByOrgId',
    method: 'get',
    params: { orgId },
  })
}

/**
 * @description 根据登录用户获取系统列表
 */
export function getSystemListByUser() {
  return request({
    url: '/system/getSystemListByUser',
    method: 'get',
  })
}

/**
 * @description 保存系统
 * @param id id
 * @param name 系统名称
 * @param orgId 单位id
 * @param deleteVisble 是否显示删除按钮
 */
export function save(data) {
  return request({
    url: '/system/save',
    method: 'post',
    data,
  })
}
