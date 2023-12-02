<template>
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
      <van-button size="mini">加入购物车</van-button>
      <van-button size="mini">购买</van-button>
    </template>
  </van-card>
</template>

<script>
export default {
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
      const arry = this.goodsDetail.goods_name.split(/\s/)
      return arry[index]
    }
  }
}
</script>

<style>
</style>
