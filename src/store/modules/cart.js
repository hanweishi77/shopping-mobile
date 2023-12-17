import { changeCount, getCartList, delCart } from '@/api/cart'
import { Toast } from 'vant'

export default {
  namespaced: true,
  state () {
    return {
      cartList: [] // 默认购物车商品列表空
    }
  },
  mutations: {
    // 提供一个设置 cartList 的 mutation
    setCartList (state, newList) {
      state.cartList = newList
    },
    // 提供让对应goodsId的商品isChecked取反的方法,不去数据库维护选中状态
    toggleCheck (state, goodsId) {
      console.log('@vuex中选中状态要取反的商品id', goodsId)
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
      console.log('@goods.isChecked', goods.isChecked)
    },
    // 提供让全部商品isChecked取反的方法，不去数据库维护选中状态
    toggleCheckAll (state, flag) {
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    },
    // 提供一个更改cartList中商品数量的 mutation
    changeCount (state, { goodsId, goodsNum }) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.goods_num = goodsNum
    }
  },
  actions: {
    // 后台获取购物车商品数据
    async getCartAction (context) {
      // 从后台获取购物车商品数据
      const { data: { data } } = await getCartList()
      // 后台返回的数据中，不包含复选框的选中状态
      // 需要手动维护数据，给每一项，添加一个 isChecked 状态 (标记当前商品是否选中)
      if (data.list) {
        data.list.forEach(item => {
          item.isChecked = true
        })
        // 设置数据的全局状态
        context.commit('setCartList', data.list)
      }
    },
    // 修改购物车商品数量
    async changeCountAction (context, obj) {
      const { goodsNum, goodsId, goodsSkuId } = obj
      // 修改数据的全局状态
      context.commit('changeCount', { goodsId, goodsNum })
      console.log('@vuex中goodsNum, goodsId, goodsSkuId', goodsNum, goodsId, goodsSkuId)
      // 去后台修改商品数量
      await changeCount(goodsId, goodsNum, goodsSkuId)
    },
    // 删除购物车商品数据
    async delCartAction (context) {
      // 获取选择删除的商品列表
      const selCartList = context.getters.selCartList
      // console.log('@获取选择删除的商品列表', selCartList)
      // 获取删除商品组的id数组
      const cartIds = selCartList.map(item => item.id)
      // 去后台删除购物车数据
      await delCart(cartIds)
      Toast('删除成功')
      // 重新渲染页面
      context.dispatch('getCartAction')
    }
  },
  getters: {
    // 选中的商品项
    selCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 购物车商品总量
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的总价
    selPrice (state, getters) {
      return getters.selCartList.reduce(
        (sum, item) =>
          sum + item.goods_num * item.goods.goods_price_max, 0
      ).toFixed(2)
    },
    // 选择商品数目
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 商品是否全选
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}
