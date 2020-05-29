const getters = {
  token: (state) => state.user.token,
  info: (state) => state.user.info,
  allRoutes: (state) => state.user.allRoutes,
  systemOrgNodeTree: (state) => state.publicData.systemOrgNodeTree,
  keepRouters: (state) => state.baseData.keepRouters,
}
export default getters
