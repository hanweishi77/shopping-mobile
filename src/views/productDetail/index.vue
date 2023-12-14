<template>
  <div class="prodetail">
    <van-nav-bar fixed title="商品详情页" left-arrow @click-left="$router.go(-1)" />
    <van-swipe :autoplay="4000" @change="onChange">
      <van-swipe-item v-for="(image, index) in images " :key="index">
        <img :src="image.external_url" />
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }} / {{ images.length }}</div>
      </template>
    </van-swipe>
    <!-- 商品说明 -->
    <div class="info">
      <div class="title">
        <div class="price">
          <span class="now">￥{{detail.goods_price_max}}</span>
          <span class="oldprice">￥{{detail.line_price_max}}</span>
        </div>
        <div class="sellcount">已售 {{detail.goods_sales}} 件</div>
      </div>
      <div class="msg text-ellipsis-2">
        {{detail.goods_name}}
      </div>
      <div class="service">
        <div class="left-words">
          <span><van-icon name="passed" />七天无理由退货</span>
          <span><van-icon name="passed" />48小时发货</span>
        </div>
        <div class="right-icon">
          <van-icon name="arrow" @click="showServiceFn"/>
        </div>
      </div>
    </div>
    <!-- 商品评价 -->
    <div class="comment">
      <div class="comment-title">
        <div class="left">商品评价 ({{commentTotal}}条)</div>
        <div class="right">查看更多 <van-icon name="arrow" /> </div>
      </div>
      <div class="comment-list">
        <div class="comment-item" v-for="item in commentList" :key="item.comment_id">
          <div class="top">
            <img :src="item.user.avatar_url" alt="">
            <div class="name">{{ item.user.nick_name }}</div>
            <van-rate :size="16" :value="item.score / 2" color="#ffd21e" void-icon="star" void-color="#eee"/>
          </div>
          <div class="content">
            {{ item.content }}
          </div>
          <div class="time">
            {{ item.create_time }}
          </div>
        </div>
      </div>
    </div>
    <!-- 商品描述 -->
    <div class="desc" v-html="detail.content">
    </div>
    <!-- 底部 -->
    <div class="to-fixed-bottom">
      <div class="footer">
        <div @click="$router.push('/')" class="icon-home">
          <van-icon name="wap-home-o" />
          <span>首页</span>
        </div>
        <div @click="$router.push('/cart')" class="icon-cart">
          <span v-if="true" class="num">{{ cartTotal }}</span>
          <van-icon name="shopping-cart-o" />
          <span>购物车</span>
        </div>
        <div  class="btn-add" @click="showPannelCartFn">加入购物车</div>
        <div  class="btn-buy" @click="showPannelBuyNowFn">立刻购买</div>
      </div>
    </div>
    <!-- 加入购物车/立即购买 公用的弹层 -->
    <van-action-sheet v-model="showPannel" :title="mode === 'cart' ? '加入购物车' : '立刻购买'">
      <div class="product">
        <div class="product-title">
          <div class="left">
            <img :src="detail.goods_image" alt="">
          </div>
          <div class="right">
            <div class="price">
              <span>¥</span>
              <span class="nowprice">{{ detail.goods_price_max }}</span>
            </div>
            <div class="count">
              <span>库存</span>
              <span>{{ detail.stock_total }}</span>
            </div>
          </div>
        </div>
        <div class="num-box">
          <span>数量</span>
          <!-- 给组件传value的值,@input方法接受子组件通信-->
          <CountBox v-bind:value="addCount" v-on:input="(num) => { addCount = num }"></CountBox>
        </div>
        <!-- 有库存才显示提交按钮 -->
        <div class="showbtn" v-if="detail.stock_total > 0">
          <div class="btn" v-if="mode === 'cart'" @click="addCartFn()">加入购物车</div>
          <div class="btn now" v-else  @click="$router.push('/pay')">立刻购买</div>
        </div>
        <div class="btn-none" v-else>该商品已抢完</div>
      </div>
    </van-action-sheet>
    <!-- 服务弹层 -->
    <van-action-sheet v-model="showService" title="服务">
      <div class="content">
        <div class="text"><van-icon name="passed" />七天无理由退货</div>
        <div class="text description">满足相应条件时，消费者可申请7天无理由退货</div>
        <div class="text"><van-icon name="passed" />48小时发货</div>
        <div class="text description" >下单后48小时之内发货</div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import CountBox from '@/components/CountBox.vue'
import { getProDetail, getProComments } from '@/api/product.js'
import { addCart } from '@/api/cart.js'
import { loginConfirm } from '@/mixins/loginConfirm.js'
export default {
  name: 'ProductDetailIndex',
  mixins: [loginConfirm],
  components: {
    CountBox
  },
  data () {
    return {
      current: 0, // 轮播图当前页码
      images: [], // 轮播图图片组
      detail: {}, // 商品详细数据
      commentTotal: 0, // 评价总数
      commentList: [], // 评价列表
      showPannel: false, // 控制弹层的显示隐藏
      showService: false, // 控制弹层的显示隐藏
      mode: 'cart', // 标记弹层模式，默认购物车
      addCount: 1, // 商品的数字框绑定的数据
      cartTotal: 0 // 购物车商品总数
    }
  },
  computed: {
    // 商品ID
    goodsId () {
      return this.$route.params.id
    }
  },
  async created () {
    if (this.loginConfirm) {
      await this.$store.dispatch('cart/getCartAction')
      // console.log('@@@cartTotal', this.$store.getters['cart/cartTotal'])
      this.cartTotal = this.$store.getters['cart/cartTotal']
    }
    this.handleProDetail()
    this.handleProComments()
  },
  methods: {
    // 产品轮播图当前页码
    onChange (index) {
      this.current = index
    },
    // 弹层显示 服务说明
    showServiceFn () {
      this.showService = true
    },
    // 弹层显示 加入购物车
    showPannelCartFn () {
      this.mode = 'cart'
      this.showPannel = true
    },
    // 弹层显示 立即购买
    showPannelBuyNowFn () {
      this.mode = 'buyNow'
      this.showPannel = true
    },
    // 加入购物车
    async addCartFn () {
      // 用户未登录
      if (!this.loginConfirm()) {
        return
      }
      // 用户已登录,添加商品到后台
      const { data } = await addCart(this.goodsId, this.addCount, this.detail.skuList[0].goods_sku_id)
      // console.log(data.message, data.status, data.data)
      this.cartTotal = data.data.cartTotal
      this.$toast(data.message)
      this.showPannel = false
    },
    // 商品展示数据
    async handleProDetail () {
      // 后台获取商品详细信息
      const { data: { data: { detail } } } = await getProDetail(this.goodsId)
      console.log('@商品展示数据', detail)
      this.detail = detail
      this.images = detail.goods_images
    },
    // 商品评价数据
    async handleProComments () {
      // 后台获取商品评价数据,限制8条
      const { data: { data } } = await getProComments(this.goodsId, 8)
      // console.log('@res', data)
      this.commentList = data.list
      this.commentTotal = data.total
    }
  }
}
</script>

<style lang="less" scoped>
.prodetail {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  img {
    display: block;
    width: 100%;
    height: 375px;
  }
  .custom-indicator {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 5px 10px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
  }
  .desc {
    width: 100%;
    overflow: scroll;
    ::v-deep img {
      display: block;
      width: 100%!important;
    }
  }
  .info {
    padding: 10px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    .now {
      color: #fa2209;
      font-size: 20px;
    }
    .oldprice {
      color: #959595;
      font-size: 16px;
      text-decoration: line-through;
      margin-left: 5px;
    }
    .sellcount {
      color: #959595;
      font-size: 16px;
      position: relative;
      top: 4px;
    }
  }
  .msg {
    font-size: 16px;
    line-height: 24px;
    margin-top: 5px;
  }
  .service {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    margin-top: 10px;
    font-size: 16px;
    background-color: #fafafa;
    .left-words {
      span {
        margin-right: 10px;
      }
      .van-icon {
        margin-right: 4px;
        color: #fa2209;
      }
    }
  }

  .comment {
    padding: 10px;
  }
  .comment-title {
    display: flex;
    justify-content: space-between;
    .right {
      color: #959595;
    }
  }

  .comment-item {
    font-size: 16px;
    line-height: 30px;
    .top {
      height: 30px;
      display: flex;
      align-items: center;
      margin-top: 20px;
      img {
        width: 20px;
        height: 20px;
      }
      .name {
        margin: 0 10px;
      }
    }
    .time {
      color: #999;
    }
  }
  .to-fixed-bottom {
    width: 100%;
    height: 55px;
  }
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 55px;
    background-color: #fff;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .icon-home, .icon-cart {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      .van-icon {
        font-size: 24px;
      }
    }
    .btn-add,
    .btn-buy {
      height: 36px;
      line-height: 36px;
      width: 120px;
      border-radius: 18px;
      background-color: #ffa900;
      text-align: center;
      color: #fff;
      font-size: 14px;
    }
    .btn-buy {
      background-color: #fe5630;
    }
  }
}

.tips {
  padding: 10px;
}
// 购买的弹层的样式
.product {
  .product-title {
    display: flex;
    .left {
      img {
        width: 90px;
        height: 90px;
      }
      margin: 10px;
    }
    .right {
      flex: 1;
      padding: 10px;
      .price {
        font-size: 14px;
        color: #fe560a;
        .nowprice {
          font-size: 24px;
          margin: 0 5px;
        }
      }
    }
  }

  .num-box {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
  }

  .btn, .btn-none {
    height: 40px;
    line-height: 40px;
    margin: 20px;
    border-radius: 20px;
    text-align: center;
    color: rgb(255, 255, 255);
    background-color: rgb(255, 148, 2);
  }
  .btn.now {
    background-color: #fe5630;
  }
  .btn-none {
    background-color: #cccccc;
  }
}

// 底部
.footer .icon-cart {
  position: relative;
  padding: 0 6px;
  .num {
    z-index: 999;
    position: absolute;
    top: -2px;
    right: 0;
    min-width: 16px;
    padding: 0 4px;
    color: #fff;
    text-align: center;
    background-color: #ee0a24;
    border-radius: 50%;
  }
}
// 服务弹层
.content {
  padding: 10px 20px;
  .text {
    padding: 10px 0;
  }
  .description {
    font-size: 12px;
    text-indent: 15px;
  }
  .van-icon-passed {
    color: red;
    margin-right: 4px;
  }
}
</style>
