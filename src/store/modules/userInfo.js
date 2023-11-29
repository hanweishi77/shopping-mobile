const INFO_KEY = 'mb_shopping_info'

const state = {
  // userInfo从localStorage取值,若无则默认为空
  userInfo: () => {
    const defaultObj = { token: '', userId: '' }
    const result = localStorage.getItem(INFO_KEY)
    return result ? JSON.parse(result) : defaultObj
  }
}
const mutations = {
  setUserInfo (state, obj) {
    // token,userId存入本地localStorage
    localStorage.setItem(INFO_KEY, JSON.stringify(obj))
  }
}
export default {
  namespaced: true,
  state,
  mutations
}
