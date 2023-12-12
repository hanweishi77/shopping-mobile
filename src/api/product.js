import request from '@/utils/request'

// 获取搜索商品页列表的数据
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

// 获取商品详细数据
export const getProDetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId // 商品id,参数可选
    }
  })
}

// 获取商品评价列表数据
export const getProComments = (goodsId, limit) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit
    }
  })
}
