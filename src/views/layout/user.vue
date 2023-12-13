<template>
  <div class="user">
    <!-- 头部 -->
    <div v-if="isLogin" class="head-area">
      <div class="head-img">
        <img src="@/assets/default-avatar.png" alt="" />
      </div>
      <div class="info">
        <div class="nickname">张三</div>
        <div class="grand">
          <van-icon name="diamond-o" />
          普通会员
        </div>
      </div>
    </div>
    <div v-else class="head-area" @click="$router.push('/login')">
      <div class="head-img">
        <img src="@/assets/default-avatar.png" alt="" />
      </div>
      <div class="info">
        <div class="login">未登录</div>
        <div class="login">点击登录账号</div>
      </div>
    </div>
    <!-- 账号钱包栏 -->
    <div class="my-asset">
      <div class="asset-left">
        <div class="asset-left-item">
          <span>0</span>
          <span>账户余额</span>
        </div>
        <div class="asset-left-item">
          <span>0</span>
          <span>积分</span>
        </div>
        <div class="asset-left-item">
          <span>0</span>
          <span>优惠券</span>
        </div>
      </div>
      <div class="asset-right">
        <div class="asset-right-item">
          <van-icon name="balance-pay" />
          <span>我的钱包</span>
        </div>
      </div>
    </div>
    <!-- 订单栏 -->
   <div class="order-navbar">
     <div class="order-navbar-item" @click="$router.push('/myorder?dataType=all')">
       <van-icon name="balance-list-o" />
       <span>全部订单</span>
     </div>
     <div class="order-navbar-item" @click="$router.push('/myorder?dataType=payment')">
       <van-icon name="clock-o" />
       <span>待支付</span>
     </div>
     <div class="order-navbar-item" @click="$router.push('/myorder?dataType=delivery')">
       <van-icon name="logistics" />
       <span>待发货</span>
     </div>
     <div class="order-navbar-item" @click="$router.push('/myorder?dataType=received')">
       <van-icon name="send-gift-o" />
       <span>待收货</span>
     </div>
   </div>
    <!-- 我的服务 -->
    <div class="service">
      <div class="title">我的服务</div>
      <van-grid :border="false" :column-num="4">
        <van-grid-item icon="newspaper-o" text="收货地址" />
        <van-grid-item icon="gift-o" text="领券中心" />
        <van-grid-item icon="gift-card-o" text="优惠券" />
        <van-grid-item icon="question-o" text="我的帮助" />
        <van-grid-item icon="balance-o" text="我的积分" />
        <van-grid-item icon="refund-o" text="退换/售后" />
      </van-grid>
    </div>
    <div class="logout-btn">
      <button @click="logout">退出登录</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutUser',
  computed: {
    isLogin () {
      return this.$store.getters.token
    }
  },
  methods: {
    logout () {
      this.$dialog.confirm({
        title: '温馨提示',
        message: '你确认要退出么'
      })
        .then(() => {
          // on confirm
          this.$store.dispatch('user/logout')
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style scoped lang="less">
.user {
  background-color: #f7f7f7;
}
.head-area {
  height: 130px;
  background: url("http://cba.itlike.com/public/mweb/static/background/user-header2.png");
  align-items: center;
  display: flex;
  .head-img {
    width: 50px;
    height: 50px;
    overflow: hidden;
    margin: 0 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .info {
    line-height: 25px;
  }
}
.my-asset {
  display: flex;
  padding: 20px 0;
  font-size: 16px;
  font-weight: 400;
  color: #646566;
  .asset-left {
    flex: 3;
    display: flex;
    justify-content: space-evenly;
    .asset-left-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      align-items: center;
      span:first-child {
        font-size: 18px;
        margin-bottom: 5px;
        color: #ff0000;
      }
    }
  }
  .asset-right {
    flex: 1;
    .asset-right-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .van-icon {
        font-size: 22px;
        margin-bottom: 1px;
      }
    }
  }
}
.order-navbar {
  display: flex;
  padding: 15px 0;
  margin: 10px;
  font-size: 12px;
  color: #646566;
  background-color: #fff;
  border-radius: 5px;
  .order-navbar-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 25%;
    .van-icon {
      font-size: 24px;
      margin-bottom: 5px;
    }
  }
}
.service {
  background-color: #fff;
  .title {
    padding: 15px 0 0 20px;
    color: #646566;
    font-size: 16px;
  }
}
.logout-btn {
  padding: 8px 0;
  button {
    display: block;
    margin: 0 auto;
    width: 70%;
    font-size: 14px;
    color: #616161;
    border-radius: 9px;
    border: 1px solid #dcdcdc;
    padding: 7px 0;
    background-color: #fafafa;
  }
}
</style>
