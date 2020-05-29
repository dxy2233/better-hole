import { getSystemOrgNodeTree } from '@/api/systemOrgNode'

const state = {
  systemOrgNodeTree: [],
}

const mutations = {
  setOrgTree: (state, tree) => {
    state.systemOrgNodeTree = tree
  },
}

const actions = {
  // 所属单位树
  getOrgTree({ commit }) {
    return new Promise((resolve, reject) => {
      getSystemOrgNodeTree()
        .then((res) => {
          commit('setOrgTree', res.data)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
