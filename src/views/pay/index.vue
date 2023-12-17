<template>
  <div class="pay">
    <!-- 顶部 -->
    <van-nav-bar title="订单结算台" left-arrow  @click-left="$router.go(-1)" />
    <!-- 地址 -->
    <div class="address" @click="$router.push('/adress')">
      <div class="left-icon">
        <van-icon name="location-o" />
      </div>
      <div class="info" v-if="selectAddress">
        <div class="info-content">
          <span class="name">{{ selectAddress.name }}</span>
          <span class="mobile">{{ selectAddress.phone }}</span>
        </div>
        <div class="info-address">
          {{ longAddress }}
        </div>
      </div>
      <div class="info" v-else>
        请选择配送地址
      </div>
      <div class="right-icon">
        <van-icon name="arrow" />
      </div>
    </div>
    <!-- 下单商品列表 -->
    <div class="goods" v-if="order.goodsList">
      <ul>
        <li class="goods-item" v-for="item in order.goodsList" :key="item.goods_id">
          <div class="goods-item-left">
            <img :src="item.goods_image" alt="" />
          </div>
          <div class="goods-item-right">
            <div class="goods-name twoline-hide">
             {{ item.goods_name }}
            </div>
            <div class="goods-detail">
              <span>x<i>{{ item.total_num }}</i></span>
              <span>￥<i>{{ item.total_pay_price }}</i></span>
            </div>
          </div>
        </li>
      </ul>
      <div class="flow-num-box">
        <div>共<i>{{ order.orderTotalNum }}</i>件商品,合计:<span>￥<i>{{ order.orderTotalPrice }}</i></span></div>
      </div>
    </div>
    <!-- 支付详情 -->
    <div class="pay-detail">
      <div class="pay-cell">
        <span>订单总金额：</span>
        <span class="red">￥{{ order.orderTotalPrice }}</span>
      </div>
      <div class="pay-cell">
        <span>优惠券：</span>
        <span>无优惠券可用</span>
      </div>
      <div class="pay-cell">
        <span>配送费用：</span>
        <span v-if="!selectAddress">请先选择配送地址</span>
        <span v-else class="red">+￥0.00</span>
      </div>
    </div>
    <!-- 支付方式 -->
    <div class="pay-way">
      <span class="tip">支付方式</span>
      <div class="pay-cell">
        <span><van-icon name="balance-o" />余额支付（可用 ¥ {{ personal.balance }} 元）</span>
        <!-- <span>请先选择配送地址</span> -->
        <span class="red"><van-icon name="passed" /></span>
      </div>
    </div>
    <!-- 买家留言 -->
    <div class="buytips">
      <textarea v-model="remark" placeholder="选填：买家留言（50字内）" name="" id="" cols="30" rows="10"></textarea>
    </div>
    <!-- 底部提交 -->
    <div class="footer-fixed">
      <div class="left">实付款：<span>￥{{ order.orderTotalPrice }}</span></div>
      <div class="pay-btn" @click="submitOrder">提交订单</div>
    </div>
  </div>
</template>

<script>
import { getAddressList } from '@/api/adress.js'
import { checkOrder, submitOrder } from '@/api/order.js'
export default {
  name: 'PayIndex',
  data () {
    return {
      addressList: [], // 初始地址列表
      selectAddress: '', // 默认地址
      longAddress: '', // 长地址
      order: {},
      personal: {},
      remark: '' // 备注留言
    }
  },
  computed: {
    // 结算模式 cart buyNow
    mode () {
      return this.$route.query.mode
    },
    // 购物车列表id
    cartIds () {
      return this.$route.query.cartIds
    },
    // 商品id
    goodsId () {
      return this.$route.query.goodsId
    },
    // 商品分类id
    goodsSkuId () {
      return this.$route.query.goodsSkuId
    },
    // 商品数
    goodsNum () {
      return this.$route.query.goodsNum
    }
  },
  created () {
    this.getAddress()
    this.getOrderList()
  },
  methods: {
    // 获取送货地址
    async getAddress () {
      const { data: { data: { list } } } = await getAddressList()
      console.log(list)
      this.addressList = list
      this.selectAddress = list[1] // 默认第二个地址及长地址
      const region = list[1].region
      this.longAddress = region.province + region.city + region.region + list[1].detail
    },
    // 获取结算列表
    async getOrderList () {
      // 购物车结算
      if (this.mode === 'cart') {
        const { data: { data: { order, personal } } } = await checkOrder(this.mode, {
          cartIds: this.cartIds
        })
        console.log('@order', order, '@personal', personal, '@ids', this.cartIds)
        this.order = order
        this.personal = personal
      }
      // 立刻购买结算
      if (this.mode === 'buyNow') {
        const { data: { data: { order, personal } } } = await checkOrder(this.mode, {
          goodsId: this.goodsId,
          goodsSkuId: this.goodsSkuId,
          goodsNum: this.goodsNum
        })
        this.order = order
        this.personal = personal
      }
    },
    // 提交订单
    async submitOrder () {
      if (this.mode === 'cart') {
        await submitOrder(this.mode, {
          remark: this.remark,
          cartIds: this.cartIds
        })
      }
      if (this.mode === 'buyNow') {
        await submitOrder(this.mode, {
          remark: this.remark,
          goodsId: this.goodsId,
          goodsSkuId: this.goodsSkuId,
          goodsNum: this.goodsNum
        })
      }
      this.$toast.success('支付成功')
      this.$router.replace('/myorder')
    }
  }
}
</script>

<style scoped lang="less">
.pay {
  font-size: 14px;
}
// 地址
.address {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  margin-right: 5px;
  font-size: 14px;
  color: #666;
  position: relative;
  background: url(@/assets/border-line.png) bottom repeat-x;
  background-size: 60px auto;
  .left-icon {
    font-size: 20px;
    margin-right: 20px;
  }
  .right-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-7px);
  }
}
// 商品
.goods {
  margin-top: 18px;
  .goods-item {
    display: flex;
    padding: 14px 22px 10px 22px;
    background: #fff;
    border-bottom: 1px solid #f8f8f8;
    .goods-item-left {
      margin-right: 14px;
      img {
        width: 80px;
        height: 80px;
        border: 1px solid #eee;
      }
    }
    .goods-item-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .goods-name {
        padding-top: 5px;
        color: #333;
      }
      .twoline-hide {
        display: -webkit-box;
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .goods-detail {
        padding-top: 7px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span:first-child {
          font-size: 18px;
        }
        span:nth-child(2) {
          font-size: 16px;
          color: red;
        }
        i {
          font-style: normal;
        }
      }
    }
  }
  .flow-num-box {
    display: flex;
    justify-content: flex-end;
    padding: 14px 18px;
    border-bottom: 1px solid #efefef;
    color: #666;
    span {
      margin-left: 10px;
      font-size: 16px;
      color: #fa2209;
    }
    i { font-style: normal; }
  }
}
// 支付详情
.pay-detail {
  border-bottom: 1px solid #efefef;
  .pay-cell {
    padding: 14px 18px;
    color: #333;
    display: flex;
    justify-content: space-between;
    .red {
      color: #fa2209;
    }
  }
}
// 支付方式
.pay-way {
  padding: 10px 12px;
  border-bottom: 1px solid #efefef;
  .tip {
    line-height: 30px;
  }
  .pay-cell {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
  }
  .van-icon {
    font-size: 20px;
    margin-right: 5px;
  }
}
// 买家建议
.buytips {
  display: block;
  textarea {
    display: block;
    width: 100%;
    border: none;
    font-size: 14px;
    padding: 12px;
    height: 100px;
  }
}
// 底部提交
.footer-fixed {
  position: fixed;
  background-color: #fff;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 46px;
  line-height: 46px;
  border-top: 1px solid #efefef;
  padding: 0 15px 0 0;
  display: flex;
  justify-content: space-between;
  .left {
    flex: 1;
    padding-left: 12px;
    color: #666;
    span {
      color:#fa2209;
    }
  }
  .pay-btn {
    width: 121px;
    background: linear-gradient(90deg,#f9211c,#ff6335);
    color: #fff;
    text-align: center;
    line-height: 46px;
    display: block;
    font-size: 14px;
  }
}
</style>
