<template>
  <div>
    <van-nav-bar title="商品列表"  left-arrow
      @click-left="$router.go(-1)"
    />
    <van-search :placeholder="querySearch" input-align="center" show-action
      @click="$router.push('/search')" readonly>
      <template #action>
        <van-icon  :name="vanIcon"  size='26' @click="flag = !flag; vanIcon= flag ? 'list-switching' : 'list-switch' " />
      </template>
    </van-search>
    <div class="choice">
      <span>综合</span>
      <span @click="proListSortByGoodsSales">销量</span>
      <div class="price">
        <span>价格</span>
        <div class="price-arrow">
          <van-icon name="arrow-up" @click="proListSortByPrice(-1)" />
          <van-icon name="arrow-down" @click="proListSortByPrice(1)" />
        </div>
      </div>
    </div>
    <div class="goods-list" v-show="flag">
      <GoodsItem v-for="item in proList" :key="item.goods_id" :item="item"></GoodsItem>
    </div>
    <div class="goods-list" v-show="!flag">
      <GoodsCard v-for="item in proList" :key="item.goods_id" :item="item"></GoodsCard>
    </div>
  </div>
</template>

<script>
import GoodsCard from '@/components/GoodsCard.vue'
import GoodsItem from '@/components/GoodsItem.vue'
import { getProList } from '@/api/product.js'
export default {
  name: 'SearchList',
  components: {
    GoodsCard,
    GoodsItem
  },
  data () {
    return {
      // 切换下面商品卡片展示方式
      flag: true,
      vanIcon: 'list-switching',
      page: 1,
      proList: []
    }
  },
  computed: {
    // 获取地址栏的搜索关键字
    querySearch () {
      return this.$route.query.search
    }
  },
  methods: {
    proListSortByGoodsSales () {
      this.$toast('该功能未添加哦')
    },
    // 商品价格排序
    proListSortByPrice (flag) {
      // console.log(this.proList)
      function ownSort (a, b) {
        // 比较函数接收两参数 a-b比较，返回1，0，-1
        if ((+a.goods_price_max) <= (+b.goods_price_max)) {
          return -flag // a的价格小于等于b的价格,(降序是返回-1)
        } else {
          return flag // a的价格-b的价格,(降序是返回1)
        }
      }
      this.proList.sort(ownSort)
      // console.log(typeof this.proList[0].goods_price_max)
      // console.log(this.proList[1].goods_price_max)
    }
  },
  async created () {
    const { data: { data: { list } } } = await getProList({
      categoryId: this.$route.query.categoryId,
      goodsName: this.querySearch,
      page: this.page
    })
    console.log(list)
    this.proList = list.data
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
  line-height: 4px;
  font-size: 14px;
}
</style>
