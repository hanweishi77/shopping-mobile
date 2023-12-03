<template>
  <!-- 商品卡片组件 -->
  <van-card
    :price="goodsDetail.goods_price_max"
    :desc="getName(1)"
    :title="getName(0)"
    :thumb="goodsDetail.goods_image"
    :origin-price="goodsDetail.line_price_max"
  >
    <template #tags>
      <van-tag plain type="danger">{{getName(2)}}</van-tag>
      <van-tag plain type="danger">{{getName(3)}}</van-tag>
    </template>
    <template #footer>
      已售:{{goodsDetail.goods_sales}}件
    </template>
  </van-card>
</template>

<script>
const goodsCard = {
  name: 'GoodsCardVue',
  props: {
    goodsDetail: {
      type: Object,
      valitator (value) {
        // 自定义校验逻辑
        return true
      }
    }
  },
  methods: {
    getName (index) {
      const arry = this.goodsDetail.goods_name.split(/\s+/)
      return arry[index]
    }
  }
}
// 单个导出一般默认导出，导出的是一个对象,Vue.extend()方法调用，返回 VueComponent实例
export default goodsCard
</script>

<style>
</style>
