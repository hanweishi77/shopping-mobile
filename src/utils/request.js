import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store/index.js'

// 创建 axios新实例，进行自定义配置
const axiosInstance = axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
  timeout: 9000
})
// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  // console.log(config)
  Toast.loading({
    message: '加载中...',
    forbidClick: true, // 禁止背景点击
    loadingType: 'spinner', // 配置loading图标
    duration: 0 // 0表示不会自动消失，其他数字代表持续时间(ms)
  })
  // 只要有token，就在请求时携带，便于请求需要授权的接口
  const token = store.state.user.userInfo.token
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }
  return config
}, function (error) {
  // Do something with request error
  Toast('发送请求失败')
  return Promise.reject(error)
})
// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // console.log(response)
  Toast.clear()
  // Toast(response.data.message) // Toast默认是单例模式，此处轻提示会将前一个清除
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  Toast('返回请求失败')
  return Promise.reject(error)
})
// 默认导出自定义配置的axios新实例
export default axiosInstance
