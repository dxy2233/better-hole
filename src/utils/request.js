import axios from 'axios'
import store from '@/store'
import router from '@/router'
import Vue from 'vue'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  // baseURL: process.env.NODE_ENV === 'development' ? process.env.VUE_APP_BASE_API : window.g.baseURL,
  // withCredentials: true, // 跨域请求时发送 cookies
  // timeout: 5000
})

service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers['Authorization'] = store.getters.token
    }
    if (
      Object.prototype.toString.call(config.data) === '[object FormData]' &&
      config.data.has('file')
    ) {
      Vue.prototype.$loading(true)
    }
    if (config.responseType === 'blob') {
      Vue.prototype.$loading(true)
    }
    return config
  },
  (error) => {
    // console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    Vue.prototype.$loading(false)
    if (response.data.type === 'application/octet-stream') {
      let blob = new Blob([response.data], {
        type:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
      })
      let objectUrl = window.URL.createObjectURL(blob)
      let a = document.createElement('a')
      a.href = objectUrl
      let name = decodeURIComponent(response.headers['content-disposition'])
      a.download = name.slice(name.indexOf('=') + 1)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(objectUrl)
      return 'ok'
    }
    const res = response.data
    if (res.status !== 'ok') {
      if (res.type === 'application/json') {
        Vue.prototype.$message({
          content: '系统异常，请联系管理员!',
          type: 'error',
          time: 5 * 1000,
        })
      } else if (res.status === 'tokenError') {
        const reStart = async () => {
          await store.dispatch('user/logout')
          router.push({ name: 'Login', params: { reset: true } })
        }
        reStart()
      } else {
        Vue.prototype.$message({
          content: res.message || 'error',
          type: 'error',
          time: 5 * 1000,
        })
      }
      return Promise.reject(res.message || 'error')
    } else {
      return res
    }
  },
  (error) => {
    Vue.prototype.$loading(false)
    return Promise.reject(error)
  }
)

export default service
