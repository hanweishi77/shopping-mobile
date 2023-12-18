<template>
  <div class="order">
    <van-nav-bar title="我的订单" left-arrow @click-left="$router.go(-1)" />

    <van-tabs v-model="active" sticky>
      <van-tab name="all" title="全部"></van-tab>
      <van-tab name="payment" title="待支付"></van-tab>
      <van-tab name="delivery" title="待发货"></van-tab>
      <van-tab name="received" title="待收货"></van-tab>
      <van-tab name="comment" title="待评价"></van-tab>
    </van-tabs>
    <OrderListItem v-for="item in list" :key="item.order_id" :item="item" @renovateGetOrderList="getOrderList"></OrderListItem>
    <div class="to-fixed-bottom">
      <van-pagination
        v-model="page"
        :total-items="120"
        :show-page-size="3"
        force-ellipses
      />
    </div>
  </div>
</template>

<script>
import OrderListItem from '@/components/OrderListItem.vue'
import { getMyOrderList } from '@/api/order'
export default {
  name: 'myOrderIndex',
  components: {
    OrderListItem
  },
  data () {
    return {
      active: this.$route.query.dataType || 'all',
      page: 1,
      list: []
    }
  },
  methods: {
    async getOrderList () {
      const { data: { data: { list } } } = await getMyOrderList(this.active, this.page)
      list.data.forEach((item) => {
        item.total_num = 0
        item.goods.forEach(goods => {
          item.total_num += goods.total_num
        })
      })
      console.log('@list.data', list.data)
      this.list = list.data
    }
  },
  watch: {
    active: {
      immediate: true,
      handler () {
        this.getOrderList()
      }
    },
    page: {
      handler () {
        this.getOrderList()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.order {
  background-color: #fafafa;
}
.van-tabs {
  position: sticky;
  top: 0;
}
.to-fixed-bottom::before {
  content: '';
  display: block;
  width: 100%;
  height: 40px;
}
.van-pagination {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  background-color: #fff;
  font-size: 16px;
}
</style>
