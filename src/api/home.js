import request from '@/utils/request.js'

// 获取首页接口数据
export const getHomeData = () => {
  return request({
    method: 'get',
    url: '/page/detail',
    params: {
      pageId: 0
    }
  })
}
