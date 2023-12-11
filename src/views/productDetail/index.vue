<template>
  <div class="prodetail">
    <van-nav-bar fixed title="商品详情页" left-arrow @click-left="$router.go(-1)" />
    <van-swipe :autoplay="4000" @change="onChange">
      <van-swipe-item v-for="index in 3" :key="index">
        <img src="../../assets/banner2.jpg" />
      </van-swipe-item>

      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }} / {{ images.length }}</div>
      </template>
    </van-swipe>
    <!-- 商品说明 -->
    <div class="info">
      <div class="title">
        <div class="price">
          <span class="now">￥1000</span>
          <span class="oldprice">￥1200</span>
        </div>
        <div class="sellcount">已售 3576 件</div>
      </div>
      <div class="msg text-ellipsis-2">
        商品名称介绍特性介绍特性介绍特性介绍特性介绍特性
      </div>
      <div class="service">
        <div class="left-words">
          <span><van-icon name="passed" />七天无理由退货</span>
          <span><van-icon name="passed" />48小时发货</span>
        </div>
        <div class="right-icon">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
    <!-- 商品评价 -->
    <div class="comment">
      <div class="comment-title">
        <div class="left">商品评价 (300条)</div>
        <div class="right">查看更多 <van-icon name="arrow" /> </div>
      </div>
      <div class="comment-list">
        <div class="comment-item" v-for="item in 3" :key="item">
          <div class="top">
            <img src="../../assets/main.png" alt="">
            <div class="name">用户呢称呢</div>
            <van-rate :size="16" value=2 color="#ffd21e" void-icon="star" void-color="#eee"/>
          </div>
          <div class="content">
            评论介绍
          </div>
          <div class="time">
            2023-11-09
          </div>
        </div>
      </div>
    </div>
    <!-- 商品描述 -->
    <div class="desc">
    </div>
    <!-- 底部 -->
    <div class="to-fixed-bottom">
      <div class="footer">
        <div @click="$router.push('/')" class="icon-home">
          <van-icon name="wap-home-o" />
          <span>首页</span>
        </div>
        <div @click="$router.push('/cart')" class="icon-cart">
          <span v-if="true" class="num">4</span>
          <van-icon name="shopping-cart-o" />
          <span>购物车</span>
        </div>
        <div  class="btn-add">加入购物车</div>
        <div  class="btn-buy">立刻购买</div>
      </div>
    </div>
    <!-- 加入购物车/立即购买 公用的弹层 -->
    <van-action-sheet v-model="showPannel" :title="mode === 'cart' ? '加入购物车' : '立刻购买'">
      <div class="product">
        <div class="product-title">
          <div class="left">
            <img src="../../assets/product.jpg" alt="">
          </div>
          <div class="right">
            <div class="price">
              <span>¥</span>
              <span class="nowprice">300</span>
            </div>
            <div class="count">
              <span>库存</span>
              <span>3000</span>
            </div>
          </div>
        </div>
        <div class="num-box">
          <span>数量</span>
          <!-- v-model 本质上 :value 和 @input 的简写 -->
          <CountBox v-model="addCount"></CountBox>
        </div>
        <!-- 有库存才显示提交按钮 -->
        <div class="showbtn" v-if="true">
          <div class="btn" v-if="mode === 'cart'">加入购物车</div>
          <div class="btn now" v-else>立刻购买</div>
        </div>
        <div class="btn-none" v-else>该商品已抢完</div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import CountBox from '@/components/CountBox.vue'
export default {
  name: 'productDetailIndex',
  components: {
    CountBox
  },
  data () {
    return {
      current: 0,
      images: [],
      showPannel: false, // 控制弹层的显示隐藏
      mode: 'cart', // 标记弹层状态
      addCount: 1 // 数字框绑定的数据
    }
  },
  computed: {
    goodsId () {
      return this.$route.params.id
    }
  },
  methods: {
    onChange (index) {
      this.current = index
    }
  },
  created () {
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

// 弹层的样式
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
</style>
