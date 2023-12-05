<template>
  <div>
     <!-- 二级组件展示的位置 -->
    <router-view></router-view>
    <!-- 二级路由出口 -->
    <div id="to-solve-fixed">
      <van-tabbar v-model="active" route active-color="#ee0a24" inactive-color="#000">
        <van-tabbar-item name="home" to='/home' icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item name="search" to='/category' icon="apps-o">分类页</van-tabbar-item>
        <van-tabbar-item name="friends" to='/cart' icon="shopping-cart-o">购物车</van-tabbar-item>
        <van-tabbar-item name="setting" to='/user' icon="user-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layoutIndex',
  data () {
    return {
      active: 'home'
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
