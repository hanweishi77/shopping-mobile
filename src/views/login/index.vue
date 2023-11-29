<template>
  <div class="login">
    <!-- 头部区域 -->
    <van-nav-bar
      title="会员登录"
      left-text="返回"
      right-text="测试"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="onClickRight"
    />
    <!-- 主体区域 -->
    <div class='container'>
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>
      <div class="form">
        <div class="form-item">
          <input type="text" v-model="mobile" class='inp' placeholder="请输入手机号码"/>
        </div>
        <div class="form-item">
          <input type="text" v-model="picCode" calss="inp" placeholder="请输入图形验证码"/>
          <img v-show="picUrl" :src="picUrl" alt="" />
        </div>
        <div class="form-item">
          <input type="text" v-model="msgCode" class="inp" placeholder="请输入短信验证码"/>
          <button>获取验证码</button>
        </div>
      </div>
      <div class="login-btn">登录</div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { getPicCode } from '@/api/login.js'
export default {
  name: 'loginIndex',
  data: function () {
    return {
      picKey: '', // 图形验证码唯一标识
      picUrl: '', // 图形验证码地址
      mobile: '', // 手机号
      picCode: '', // 用户输入的图形验证码
      msgCode: '' // 短信验证码
    }
  },
  async created () {
    const { data } = await getPicCode()
    // console.log(data)
    this.picKey = data.data.key
    this.picUrl = data.data.base64
  },
  methods: {
    onClickRight () {
      Toast('测试1')
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;
  .title {
    margin-bottom: 20px;
  }
  h3 {
    font-size: 26px;
    font-weight: normal;
  }
  p {
    line-height: 40px;
    font-size: 14px;
    color: #b8b8b8;
  }
  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }
  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
