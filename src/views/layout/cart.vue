<template>
  <div class="cart">
    <div class='to-fixed-top'><van-nav-bar title="购物车" fixed /></div>
    <div v-if="isLogin && cartList.length > 0">
      <!-- 购物车开头 -->
      <div class="cart-title">
        <span class="all">共<i>5</i>件商品</span>
        <span v-if="!isEdit" class="edit" @click="isEdit = !isEdit">
          <van-icon name="edit" />
          编辑
        </span>
        <span v-else class="edit" @click="isEdit = !isEdit">
          完成
        </span>
      </div>
      <!-- 购物车列表 -->
      <div class="cart-list">
        <div class="cart-item" v-for="item in cartList" :key='item.goods_id'>
          <van-checkbox :value="item.isChecked" @click="toggleCheck(item.goods_id)"></van-checkbox>
          <div class="show">
            <img :src="item.goods.goods_image" alt="">
          </div>
          <div class="info">
            <span class="tit text-ellipsis-2">{{item.goods.goods_name}}</span>
            <span class="bottom">
              <div class="price">¥ <span>{{item.goods.goods_price_max}}</span></div>
              <!-- 既要形参value，又要调用函数传参 -->
              <CountBox :value="item.goods_num" @input="(value) => changeCount(value, item.goods_id, item.goods_sku_id)"></CountBox>
            </span>
          </div>
        </div>
      </div>
      <div class="footer-fixed">
        <div class="all-check">
          <van-checkbox icon-size="18" :value="$store.getters['cart/isAllChecked']"  @click="toggleCheckAll"></van-checkbox>
          全选
        </div>
        <div class="all-total">
          <div class="price">
            <span>合计：</span>
            <span>¥ <i class="totalPrice">{{$store.getters['cart/selPrice']}}</i></span>
          </div>
          <div v-if="!isEdit"  class="goPay">结算({{cartTotal}})</div>
          <div v-else class="delete"  @click="handleDelCart">删除</div>
        </div>
      </div>
    </div>
    <div v-else class="empty-cart">
      <img src="@/assets/empty.png" alt="">
      <div class="tips">
        您的购物车是空的, 快去逛逛吧
      </div>
      <div class="btn" @click="$router.push('/')">去逛逛</div>
    </div>
  </div>
</template>

<script>
import CountBox from '@/components/CountBox.vue'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'LayoutCart',
  components: {
    CountBox
  },
  data: function () {
    return {
      isEdit: false // 是否编辑
    }
  },
  computed: {
    // 购物车商品列表
    ...mapState('cart', ['cartList']),
    // 购物车商品总数
    ...mapGetters('cart', ['cartTotal']),
    // 是否登录
    isLogin () {
      // console.log('@@', this.$store.state.user)
      return this.$store.state.user.userInfo.token
    }
  },
  created () {
    // 已经登录的用户,去后台获取用户购物车列表（actions异步任务）
    // 未登录的用户,购物车列表默认为空
    // console.log(this.isLogin)
    if (this.isLogin) {
      this.$store.dispatch('cart/getCartAction')
    }
  },
  methods: {
    // 切换单项商品选中状态
    toggleCheck (goodsId) {
      this.$store.commit('cart/toggleCheck', goodsId)
    },
    // 切换所有商品选中状态
    toggleCheckAll () {
      this.$store.commit('cart/toggleCheckAll', !this.$store.getters['cart/isAllChecked'])
    },
    // 修改商品数量
    changeCount (goodsNum, goodsId, goodsSkuId) {
      // 去进行数量的修改,更新到后台服务器（actions异步任务）
      this.$store.dispatch('cart/changeCountAction', {
        goodsNum,
        goodsId,
        goodsSkuId
      })
    },
    // 去删除购物车数据，并更新到后台服务器（actions异步任务）
    async handleDelCart () {
      await this.$store.dispatch('cart/delCartAction')
      this.isEdit = false
    }
  }
}
</script>
<style lang="less" scoped>
.to-fixed-top {
  width: 100%;
  height: 46px;
}
.cart {
  background-color: #f5f5f5;
  min-height: 100vh;
  .cart-title {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-size: 14px;
    .all {
      i {
        font-style: normal;
        margin: 0 2px;
        color: #fa2209;
        font-size: 16px;
      }
    }
    .edit {
      .van-icon {
        font-size: 18px;
      }
    }
  }
  .cart-item {
    margin: 0 10px 10px 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    border-radius: 5px;
    .show img {
      width: 100px;
      height: 100px;
    }
    .info {
      width: 210px;
      padding: 10px 5px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .bottom {
        display: flex;
        justify-content: space-between;
        .price {
          display: flex;
          align-items: flex-end;
          color: #fa2209;
          font-size: 12px;
          span {
            font-size: 16px;
          }
        }
        .count-box {
          display: flex;
          width: 110px;
          .add, .minus {
            width: 30px;
            height: 30px;
            outline: none;
            border: none;
          }
          .inp {
            width: 40px;
            height: 30px;
            outline: none;
            border: none;
            background-color: #efefef;
            text-align: center;
            margin: 0 5px;
          }
        }
      }
    }
  }
  .footer-fixed {
    position: fixed;
    left: 0;
    bottom: 50px;
    height: 50px;
    width: 100%;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    .all-check {
      display: flex;
      align-items: center;
      .van-checkbox {
        margin-right: 5px;
      }
    }
    .all-total {
      display: flex;
      line-height: 36px;
      .price {
        font-size: 14px;
        margin-right: 10px;
        .totalPrice {
          color: #fa2209;
          font-size: 18px;
          font-style: normal;
        }
      }
      .goPay, .delete {
        min-width: 100px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        background-color: #fa2f21;
        color: #fff;
        border-radius: 18px;
      }
    }
  }
}
.cart::after {
  content: '';
  display: block;
  width: 100%;
  height: 40px;
}
.empty-cart {
  padding: 80px 30px;
  img {
    width: 140px;
    height: 92px;
    display: block;
    margin: 0 auto;
  }
  .tips {
    text-align: center;
    color: #666;
    margin: 30px;
  }
  .btn {
    width: 110px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background-color: #fa2c20;
    border-radius: 16px;
    color: #fff;
    display: block;
    margin: 0 auto;
  }
}
</style>
