import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/userInfo.js'
import cart from './modules/cart.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
    token (state) {
      return state.user.userInfo.token
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    cart
  }
})
