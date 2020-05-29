import request from '@/utils/request'

/**
 * @description 删除用户
 */
export function deleteUser(id) {
  return request({
    url: '/user/deleteUser',
    method: 'get',
    params: { id },
  })
}

/**
 * @description 根据登录用户条件分页查询用户列表
 * @param startPage 页面编号
 * @param pageSize 页面大小
 * @param name 用户姓名
 * @param phone 联系方式
 * @param orgId 所属单位
 */
export function getUserList(data) {
  return request({
    url: '/user/getUserList',
    method: 'post',
    data,
  })
}

/**
 * @description 根据当前登录用户员工列表
 */
export function getUserListByOrgId() {
  return request({
    url: '/user/getUserListByOrgId',
    method: 'get',
  })
}

/**
 * @description 重置密码
 */
export function resetPassword(id) {
  return request({
    url: '/user/resetPassword',
    method: 'get',
    params: { id },
  })
}

/**
 * @description 保存用户
 * @param id 用户ID
 * @param name 姓名
 * @param phone 联系方式
 * @param address 联系地址
 * @param idCard 身份证
 * @param roleType 角色 ：3 领导 4 普通人员
 * @param orgId 所属单位ID
 * @param post 用户岗位
 * @param sex 性别 1 男 0 女
 */
export function saveUser(data) {
  return request({
    url: '/user/saveUser',
    method: 'post',
    data,
  })
}

/**
 * @description 解锁用户
 */
export function unLockUser(id) {
  return request({
    url: '/user/unLockUser',
    method: 'get',
    params: { id },
  })
}

/**
 * @description 修改密码
 * @param userId 用户ID
 * @param oldPassword 旧密码
 * @param newPassword 新密码
 */
export function updatePassword(data) {
  return request({
    url: '/user/updatePassword',
    method: 'post',
    data,
  })
}
