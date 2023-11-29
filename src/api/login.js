// 此处用于存放所有登录相关的接口请求
// 导入默认导出的axiosInstance包
import request from '@/utils/request.js'

// 获取图形验证码的函数
export const getPicCode = () => {
  // 返回封装的axios.get()得到的数据
  return request.get('/captcha/image')
}
// 获取短信验证码的函数,参数3,测试环境短信验证码默认246810
export const getMsgCode = (picCode, picKey, mobile) => {
  // 返回封装的axios.post()得到的数据
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode: picCode,
      captchaKey: picKey,
      mobile: mobile
    }
  })
}
// 发送用户输入的手机号、手机校验码给服务器的函数,服务器返回响应
export const postLoginCode = (mobile, msgCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      partyData: {},
      mobile: mobile,
      smsCode: msgCode // 短信验证码,测试环境验证码为：246810
    }
  })
}
// 返回响应数据json格式示例
// {
//     "status": 200,
//     "message": "登录成功",
//     "data": {
//         "userId": 10003,
//         "token": "1741f74aed758a688515f72572dc8e37"
//     }
// }
