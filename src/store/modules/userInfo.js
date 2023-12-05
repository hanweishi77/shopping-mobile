import { getInfo, setInfo } from '@/utils/storage.js'
const state = function () {
  return {
    // userInfo从localStorage取值,若无则默认为空
    userInfo: getInfo()
  }
}
const mutations = {
  setUserInfo (state, obj) {
    // token,userId存入本地localStorage
    setInfo(obj)
  }
}
export default {
  namespaced: true,
  state,
  mutations
}
