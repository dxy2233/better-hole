import { asyncRouterMap } from '@/router/index'
import router from '@/router'
import { login, logout } from '@/api/special'
import { getUser } from '@/api/login'

const state = {
  token: sessionStorage.getItem('token'),
  info: {},
  allRoutes: [],
}

const mutations = {
  setToken: (state, token) => {
    state.token = token
  },
  setInfo: (state, info) => {
    state.info = info
  },
  setRoutes: (state, allRoutes) => {
    state.allRoutes = allRoutes
  },
}

const actions = {
  // 登陆
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo)
        .then((res) => {
          commit('setToken', res.message)
          sessionStorage.setItem('token', res.message)
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // 获取用户信息并返回可访问路由
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getUser()
        .then((res) => {
          commit('setInfo', res.data)
          let resRouter = [asyncRouterMap[0]]
          res.data.menus.forEach((item) => {
            resRouter[0].children.push(asyncRouterMap[item])
          })
          const allRoutes = router.options.routes.concat(resRouter)
          commit('setRoutes', allRoutes)
          resolve(resRouter)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  // 注销
  logout() {
    return new Promise((resolve) => {
      logout()
      this.dispatch('user/resetToken')
      resolve()
    })
  },
  // 重置
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit('setToken', '')
      commit('setInfo', {})
      commit('setRoutes', [])
      sessionStorage.removeItem('token')
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
