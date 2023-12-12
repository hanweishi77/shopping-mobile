<template>
  <div>
    <van-nav-bar title="商品分类" left-text="返回" left-arrow @click-left="$router.go(-1)" />
    <van-search  placeholder="请输入搜索关键词" />
    <div class="main">
      <div class="left">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item  v-for="item in list" :title="item.name" :key="item.category_id"/>
        </van-sidebar>
      </div>
      <div class="right">
        <div class="card" v-for="item in list[activeKey]?.children" :key="item.category_id">
          <img :src="item.image?.external_url" alt="">
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCategoryData } from '@/api/category'
export default {
  name: 'LayoutCategory',
  data () {
    return {
      activeKey: 0,
      list: []
    }
  },
  created () {
    this.getCategoryList()
  },
  methods: {
    async getCategoryList () {
      const { data: { data: { list } } } = await getCategoryData()
      console.log(list)
      this.list = list
    }
  }
}
</script>

<style scoped lang="less">
.main {
  margin-top: 15px;
  display: flex;
}
.left {
  width: 85px;
}
.right {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
.card {
  width: 33%;
  padding: 5px 10px;
  margin-bottom: 10px;
  overflow: hidden;
}
.card p {
  text-align: center;
  font-size: 14px;
}
img {
  width: 70px;
  height: 70px;
  display: block;
  margin: 5px auto;
}
</style>
