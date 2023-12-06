import request from '@/utils/request'

// 获取搜索商品列表的数据
export const getProList = (obj) => {
  const { categoryId, goodsName, page } = obj
  return request.get('/goods/list', {
    params: {
      categoryId, // 商品分类ID [pro]
      goodsName, // 商品名 [pro]
      page // 第i页 [pro]
    }
  })
}
