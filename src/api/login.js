// 此处用于存放所有登录相关的接口请求
// 导入默认导出的axiosInstance包
import request from '@/utils/request.js'

// 获取图形验证码的函数
export const getPicCode = () => {
  // 返回封装的axios.get()得到的数据
  return request.get('/captcha/image')
}
