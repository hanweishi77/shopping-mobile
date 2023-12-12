<template>
  <div>
    <!-- 导航条 -->
    <van-nav-bar :title="title" />
    <!-- 搜索框 -->
    <van-search v-model="inp" placeholder="请输入搜索关键词" @click="$router.push('/search')" />
    <!-- 轮播图 -->
    <van-swipe :autoplay="2500">
      <van-swipe-item v-for='item in bannerList' :key='item.imgUrl'>
         <img :src="item.imgUrl" alt="">
      </van-swipe-item>
    </van-swipe>
    <!-- 导航 -->
    <van-grid :column-num="5">
      <van-grid-item v-for="item in navList"
        :key="item.imgUrl" :icon="item.imgUrl" :text="item.text"
        @click="$router.push('/category')"/>
    </van-grid>
    <!-- 主会场 -->
    <div class="main">
      <img src="@/assets/main.png" alt="">
    </div>
    <!-- 猜你喜欢 -->
    <div class="guess">
      <p class="guess-title">—— 猜你喜欢 ——</p>
      <div class="goods-list">
        <GoodsItem v-for="item in proList" :key="item.goods_id" :item='item'></GoodsItem>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getHomeData } from '@/api/home.js'
export default {
  name: 'LayoutHome',
  components: {
    GoodsItem
  },
  data () {
    return {
      inp: '',
      title: '智慧商城', // 商城标题
      bannerList: [], // 轮播
      navList: [], // 导航
      proList: [] // 商品
    }
  },
  async created () {
    const { data: { data, message, status } } = await getHomeData()
    console.log('@首页数据', data, message, status)
    // console.log(data.pageData.items)
    this.title = data.pageData.page.params.title // 商城标题
    this.bannerList = data.pageData.items[1].data // 轮播图片组
    this.navList = data.pageData.items[3].data // 导航组
    // console.log(data.pageData.items[3].data)
    this.proList = data.pageData.items[6].data // 商品组
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
// 轮播图
::v-deep {
  .van-swipe-item img {
    width: 100%;
    height: 100%;
  }
}
// 主会场
.main img {
  display: block;
  width: 100%;
}

</style>
