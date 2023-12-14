<template>
  <div class="pay">
    <van-nav-bar title="订单结算台" left-text="返回" left-arrow  @click-left="$router.go(-1)" />
    <van-contact-card
      :type="currentContact.type"
      :name="currentContact.name"
      :tel="currentContact.tel"
      @click="onEdit"
    />
    <div class="goods">
      <ul>
        <li class="goods-item">
          <div class="goods-item-left">
            <img src="@/assets/product.jpg" alt="" />
          </div>
          <div class="goods-item-right">
            <div class="goods-name twoline-hide">
              荷仕兰新西兰原装进口 暖阳高端中老年奶粉375g罐装
              高钙高铁高硒 无添加蔗糖低GI配方糖尿三高放心力免疫乳铁蛋白
            </div>
            <div class="goods-detail">
              <span>x<i>2</i></span>
              <span>￥<i>2000.00</i></span>
            </div>
          </div>
        </li>
        <li class="goods-item">
          <div class="goods-item-left">
            <img src="@/assets/product.jpg" alt="" />
          </div>
          <div class="goods-item-right">
            <div class="goods-name twoline-hide">
              荷仕兰新西兰原装进口 暖阳高端中老年奶粉375g罐装
              高钙高铁高硒 无添加蔗糖低GI配方糖尿三高放心力免疫乳铁蛋白
            </div>
            <div class="goods-detail">
              <span>x<i>2</i></span>
              <span>￥<i>2000.00</i></span>
            </div>
          </div>
        </li>
      </ul>
      <div class="flow-num-box">
        <div>共<i>5</i>件商品,合计:<span>￥<i>2444.50</i></span></div>
      </div>
    </div>
    <div class="pay-detail">
      <div class="pay-cell">
        <span>订单总金额：</span>
        <span class="red">￥2002.00</span>
      </div>
      <div class="pay-cell">
        <span>优惠券：</span>
        <span>无优惠券可用</span>
      </div>
      <div class="pay-cell">
        <span>配送费用：</span>
        <span v-if="false">请先选择配送地址</span>
        <span v-else class="red">+￥2333.00</span>
      </div>
    </div>
    <!-- 支付方式 -->
    <div class="pay-way">
      <span class="tip">支付方式</span>
      <div class="pay-cell">
        <span><van-icon name="balance-o" />余额支付（可用 ¥ 23444 元）</span>
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
      <div class="left">实付款：<span>￥2555.00</span></div>
      <div class="pay-btn">提交订单</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PayIndex',
  data () {
    return {
      currentContact: {
        type: 'add', // 默认add
        name: '张三',
        tel: '13888888888'
      },
      remark: '' // 备注留言
    }
  },
  methods: {
    onEdit () {
      this.$toast('编辑')
    }
  }
}
</script>

<style scoped lang="less">
.pay {
  font-size: 14px;
}
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
