<template>
  <div>
    <van-nav-bar title="商品列表"  left-arrow
      @click-left="$router.go(-1)"
    />
    <van-search placeholder="手机" input-align="center" show-action
      @click="$router.push('/search')" readonly>
      <template #action>
        <van-icon  :name="vanIcon"  size='26' @click="flag = !flag; vanIcon= flag ? 'list-switching' : 'list-switch' " />
      </template>
    </van-search>
    <div class="choice">
      <span>综合</span>
      <span>销量</span>
      <div class="price">
        <span>价格</span>
        <div class="price-arrow">
          <van-icon name="arrow-up"/>
          <van-icon name="arrow-down"/>
        </div>
      </div>
    </div>
    <div class="goods-list" v-if="flag">
      <GoodsItem v-for="item in proList" :key="item.goods_id" :item="item"></GoodsItem>
    </div>
    <div class="goods-list" v-else>
      <GoodsCard v-for="item in proList" :key="item.goods_id" :item="item"></GoodsCard>
    </div>
  </div>
</template>

<script>
import GoodsCard from '@/components/goodsCard.vue'
import GoodsItem from '@/components/goodsItem.vue'
export default {
  name: 'searchList',
  components: {
    GoodsCard,
    GoodsItem
  },
  data () {
    return {
      // 切换下面商品卡片展示方式
      flag: true,
      vanIcon: 'list-switching',
      proList: [{
        goods_id: 10039,
        goods_image: 'http://cba.itlike.com/public/uploads/10001/20230321/c4b5c61e46489bb9b9c0630002fbd69e.jpg',
        goods_name: 'Apple-iPhone14ProMax 256G银色 移动联通电信 5G双卡双待手机',
        goods_price_max: '9899.00',
        goods_price_min: '9899.00',
        goods_sales: 37039,
        line_price_max: '20',
        line_price_min: '18',
        selling_point: ''
      },
      {
        goods_id: 10040,
        goods_image: 'http://cba.itlike.com/public/uploads/10001/20230321/c4b5c61e46489bb9b9c0630002fbd69e.jpg',
        goods_name: 'Apple-iPhone14ProMax 256G银色 移动联通电信 5G双卡双待手机',
        goods_price_max: '9899.00',
        goods_price_min: '9899.00',
        goods_sales: 37041,
        line_price_max: '20',
        line_price_min: '18',
        selling_point: ''
      },
      {
        goods_id: 10042,
        goods_image: 'http://cba.itlike.com/public/uploads/10001/20230321/c4b5c61e46489bb9b9c0630002fbd69e.jpg',
        goods_name: 'Apple-iPhone14ProMax 256G银色 移动联通电信 5G双卡双待手机',
        goods_price_max: '9899.00',
        goods_price_min: '9899.00',
        goods_sales: 37039,
        line_price_max: '20',
        line_price_min: '18',
        selling_point: ''
      },
      {
        goods_id: 10045,
        goods_image: 'http://cba.itlike.com/public/uploads/10001/20230321/c4b5c61e46489bb9b9c0630002fbd69e.jpg',
        goods_name: 'Apple-iPhone14ProMax 256G银色 移动联通电信 5G双卡双待手机',
        goods_price_max: '9899.00',
        goods_price_min: '9899.00',
        goods_sales: 37039,
        line_price_max: '20',
        line_price_min: '18',
        selling_point: ''
      },
      {
        goods_id: 10057,
        goods_image: 'http://cba.itlike.com/public/uploads/10001/20230321/c4b5c61e46489bb9b9c0630002fbd69e.jpg',
        goods_name: 'Apple-iPhone14ProMax 256G银色 移动联通电信 5G双卡双待手机',
        goods_price_max: '9899.00',
        goods_price_min: '9899.00',
        goods_sales: 37039,
        line_price_max: '20',
        line_price_min: '18',
        selling_point: ''
      }]
    }
  }
}
</script>

<style scoped lang='less'>
.van-search {
  text-align: center;
  .van-icon {
    line-height: 44px;
  }
}
.price {
  display: flex;
}
.price>span {
  align-self: center;
}
.choice {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 20px;
}
.price-arrow {
  margin-left: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.price-arrow .van-icon {
  font-size: 14px;
}
</style>
