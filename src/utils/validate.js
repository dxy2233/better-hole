export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

// 只允许输入字母、数字、“-”、“_”六位组成
export const projectCode = /^([0-9A-Za-z-_.]{6,32})$/

// 密码验证
export const pwd = /^(?=.*[a-zA-Z0-9]).{6,32}$/

// 身份证
export const idCard = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/

// 联系方式
export const contact = /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,16}/

// 邮箱
export const email = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/

// 盐
export function salt(pwd) {
  return pwd + ',' + '#'
}
