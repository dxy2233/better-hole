import request from '@/utils/request'

/**
 * @description 根据ID删除单位
 */
export function deleteSystemOrgNodeById(id) {
  return request({
    url: '/systemorgnode/deleteSystemOrgNodeById',
    method: 'get',
    params: { id },
  })
}

/**
 * @description 根据单位ID获取单位信息
 */
export function getSystemOrgById(id) {
  return request({
    url: '/systemorgnode/getSystemOrgById',
    method: 'get',
    params: { id },
  })
}

/**
 * @description 根据登录用户查询单位列表
 */
export function getSystemOrgNodeTree() {
  return request({
    url: '/systemorgnode/getSystemOrgNodeTree',
    method: 'get',
  })
}

/**
 * @description 保存单位
 * @param id id
 * @param orgName 单位名称
 * @param parentId 上级单位ID
 */
export function saveSystemOrgNode(data) {
  return request({
    url: '/systemorgnode/saveSystemOrgNode',
    method: 'post',
    data,
  })
}
