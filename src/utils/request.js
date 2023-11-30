import axios from 'axios'
import { Toast } from 'vant'

// 创建 axios新实例，进行自定义配置
const axiosInstance = axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
  timeout: 5000
})
// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  console.log('成功发送请求的拦截')
  console.log(config)
  Toast.loading({
    message: '加载中...',
    forbidClick: true, // 禁止背景点击
    loadingType: 'spinner', // 配置loading图标
    duration: 0 // 0表示不会自动消失，其他数字代表持续时间(ms)
  })
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  console.log('成功返回响应的拦截')
  Toast.clear()
  // Toast(response.data.message) // Toast默认是单例模式，此处轻提示会将前一个清除
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})
// 默认导出自定义配置的axios新实例
export default axiosInstance
