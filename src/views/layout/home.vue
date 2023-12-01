<template>
  <div>
    <!-- 导航条 -->
    <van-nav-bar title="智慧商城" />
    <!-- 搜索框 -->
    <van-search v-model="inp" placeholder="请输入搜索关键词" />
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item>
         <img src="@/assets/banner1.jpg" alt="">
      </van-swipe-item>
      <van-swipe-item>
         <img src="@/assets/banner2.jpg" alt="">
      </van-swipe-item>
      <van-swipe-item>
         <img src="@/assets/banner3.jpg" alt="">
      </van-swipe-item>
    </van-swipe>
    <!-- 导航 -->
    <van-grid :column-num="4">
      <van-grid-item v-for="value in 8" :key="value" icon="photo-o" text="文字" />
    </van-grid>
    <!-- 主会场 -->
    <div class="main">
      <img src="@/assets/main.png" alt="">
    </div>
    <!-- 猜你喜欢 -->
    <div class="guess">
      <p class="guess-title">—— 猜你喜欢 ——</p>
      <div class="goods-list">
        <GoodsCard v-for="item in 5" :key="item"></GoodsCard>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsCard from '@/components/goodsCard.vue'
export default {
  name: 'HomePage',
  components: {
    GoodsCard
  },
  data () {
    return {
      inp: ''
    }
  }
}
</script>

<style lang="less" scoped>
// vant组件 NavBar最外层class样式，从浏览器控制台查看
.van-nav-bar {
    background-color: #c21401;
  }
// vant组件里的css样式穿透，不加只能影响到组件最外层样式
::v-deep {
  .van-nav-bar__title {
    color: #fff;
  }
}
// 主会场
.main img {
  display: block;
  width: 100%;
}

</style>
