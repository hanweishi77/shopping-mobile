import request from '@/utils/request'

// 登录
export const testtongxun = () => {
  return request.post('http://127.0.0.1:8000//passport/login', {
    form: {
      isParty: false,
      partyData: {},
      mobile: 18855558888,
      smsCode: 246810 // 短信验证码,测试环境验证码为：246810
    }
  })
}
