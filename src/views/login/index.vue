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
          <input type="text" v-model="mobile" class='inp' @blur="validateMobile" maxlength="11" placeholder="请输入手机号码"/>
        </div>
        <div class="form-item">
          <input type="text" v-model="picCode" calss="inp" @blur = "validatePicCode" placeholder="请输入图形验证码"/>
          <img v-show="picUrl" @click="getPicCode" :src="picUrl" alt="" />
        </div>
        <div class="form-item">
          <input type="text" v-model="msgCode" class="inp" placeholder="请输入短信验证码"/>
          <button @click="getCode" :disabled='second === totalSecond ? false :true'>
          {{ second === totalSecond ? '获取验证码' : second + '秒后重新发送'}}
          </button>
        </div>
      </div>
      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { getPicCode, getMsgCode, postLoginCode } from '@/api/login.js'
export default {
  name: 'loginIndex',
  data: function () {
    return {
      picKey: '', // 图形验证码唯一标识
      picUrl: '', // 图形验证码地址
      mobile: '', // 手机号
      picCode: '', // 用户输入的图形验证码
      msgCode: '', // 短信验证码
      timerId: null, // 定时器重置
      second: 6, // 短信验证码获取倒计时变量（s）
      totalSecond: 6 // 设置的倒计时时间（s）
    }
  },
  async created () {
    this.getPicCode()
  },
  methods: {
    onClickRight () {
      Toast('测试1')
    },
    validateMobile () {
      if (/^1[3-9][0-9]{9}$/.test(this.mobile)) {
        return true
      } else {
        this.$toast('请输入正确的手机号')
        return false
      }
    },
    validatePicCode () {
      if (/^\w{4}$/.test(this.picCode)) {
        return true
      } else {
        this.$toast('请输入正确的图形验证码')
        return false
      }
    },
    // 获取图形验证码
    async getPicCode () {
      const { data } = await getPicCode()
      // console.log(data)
      this.picKey = data.data.key
      this.picUrl = data.data.base64
    },
    async getCode () {
      if (this.validateMobile() && this.validatePicCode() && !this.timerId) {
        // 间歇函数开启,后续点击会停止开启间歇函数
        this.timerId = setInterval(() => {
          // 开启倒计时
          this.second--
          if (this.second <= 0) {
            clearInterval(this.timerId) // 关闭定时器
            this.timerId = null // 重置定时器id,用于下次判断是否开启
            this.second = this.totalSecond // 归位
          }
        }, 1000)
        const { data } = await getMsgCode(this.picCode, this.picKey, this.mobile)
        console.log(data)
        if (data.status !== 200) {
          this.$toast(data.message)
        } else {
          this.$toast('短信发送成功，注意查收')
        }
      }
    },
    async login () {
      if (this.validateMobile() && this.validatePicCode()) {
        if (!/^\d{6}$/.test(this.msgCode)) {
          this.$toast('请输入正确的手机验证码')
        } else {
          // 发送手机号、手机验证码给服务器进行校验登录
          const { data } = await postLoginCode(this.mobile, this.msgCode)
          console.log(data.data)
          // 本地localStorage存储token、userId
          this.$store.commit('user/setUserInfo', data.data)
          this.$toast('登录成功')
          // 进行判断，看地址栏有无回跳地址
          // 1. 如果有   => 说明是其他页面，拦截到登录来的，需要回跳
          // 2. 如果没有 => 正常去首页
          // const url = this.$route.query.backUrl || '/'
          this.$router.replace('/')
        }
      }
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
