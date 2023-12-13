import { getInfo, setInfo } from '@/utils/storage.js'
const state = function () {
  return {
    // userInfo从localStorage取值,若无则默认为空
    userInfo: getInfo()
  }
}
const mutations = {
  setUserInfo (state, obj) {
    // 更新userInfo状态
    state.userInfo = obj
    // token,userId存入本地localStorage
    setInfo(obj)
  }
}
const actions = {
  logout (context) {
    context.commit('setUserInfo', {})
    // 购物车信息重置 (跨模块调用 mutation)  cart/setCartList
    context.commit('cart/setCartList', [], { root: true })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
