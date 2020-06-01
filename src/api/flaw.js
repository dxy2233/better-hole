import request from '@/utils/request'

/**
 * @description 根据ID删除漏洞信息
 */
export function deleteById(id) {
  return request({
    url: '/flaw/deleteById',
    method: 'get',
    params: { id },
  })
}

/**
 * @description 漏洞附件上传
 */
export function flawFileUpload(data) {
  return request({
    url: '/flaw/flawFileUpload',
    method: 'post',
    data,
  })
}

/**
 * @description 漏洞整改
 */
export function flawReform(id, reformStatus) {
  return request({
    url: '/flaw/flawReform',
    method: 'get',
    params: { id, reformStatus },
  })
}

/**
 * @description 项目备案条件和分页查询
 * @param startPage 页面编号
 * @param pageSize 页面大小
 * @param systemId 信息系统id
 * @param title 漏洞标题
 * @param hazardLevel 危害级别
 * @param reformStatus 整改状态（0 未整改  1  已整改 2 挂起）
 */
export function getFlawList(data) {
  return request({
    url: '/flaw/getFlawList',
    method: 'post',
    data,
  })
}

/**
 * @description 根据资产查询漏洞条件和分页查询
 * @param startPage 页面编号
 * @param pageSize 页面大小
 * @param deviceId 资产id
 */
export function getFlawListByDeviceId(data) {
  return request({
    url: '/flaw/getFlawListByDeviceId',
    method: 'post',
    data,
  })
}

/**
 * @description 保存漏洞信息
 * @param id id
 * @param systemId 系统
 * @param title 漏洞标题
 * @param ipAddress IP地址
 * @param port 端口
 * @param hazardLevel 危害级别
 * @param influenceSystem 影响系统
 * @param leakHazardDesc 漏洞描述
 * @param leakSolve 漏洞解决方案
 * @param leakType 漏洞类型
 * @param leakLink 漏洞链接
 * @param seeLink 参看链接
 * @param verifyMessage 验证信息
 * @param firmPatch 厂商补丁
 * @param attachmentName 漏洞附件名称
 * @param attachmentUrl 漏洞附件地址
 */
export function save(data) {
  return request({
    url: '/flaw/save',
    method: 'post',
    data,
  })
}
