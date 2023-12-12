<template>
  <div>
     <!-- 二级组件展示的位置 -->
    <router-view></router-view>
    <!-- 二级路由出口 -->
    <div id="to-solve-fixed">
      <van-tabbar v-model="active" route active-color="#ee0a24" inactive-color="#000">
        <van-tabbar-item name="home" to='/home' icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item name="category" to='/category' icon="apps-o">分类页</van-tabbar-item>
        <van-tabbar-item name="cart" to='/cart' icon="shopping-cart-o" :badge="$store.getters['cart/cartTotal'] || 0">购物车</van-tabbar-item>
        <van-tabbar-item name="user" to='/user' icon="user-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import { loginConfirm } from '@/mixins/loginConfirm.js'
export default {
  name: 'LayoutIndex',
  mixins: [loginConfirm],
  data () {
    return {
      active: 'home'
    }
  },
  created () {
    if (this.loginConfirm) {
      this.$store.dispatch('cart/getCartAction')
    }
  }
}
</script>

<style scoped>
#to-solve-fixed {
  height: 50px;
  margin: 5px 0;
}
</style>
