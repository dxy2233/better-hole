const state = {
  keepRouters: [],
}

const mutations = {
  setKeepRouters: (state, info) => {
    state.keepRouters = info
  },
}

const actions = {
  // 更改需要缓存的菜单
  changeKeepRouters({ commit }, info) {
    return new Promise((resolve) => {
      commit('setKeepRouters', info)
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
