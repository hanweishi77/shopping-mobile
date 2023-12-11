import request from '@/utils/request'

// 获取购物车列表
export const getCartList = () => {
  return request.get('/cart/list')
}

// 更新购物车商品数量
export const changeCount = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 向后端发送删除购物车商品数据
export const delCart = (cartIds) => {
  console.log('准备去后台删除购物车商品', cartIds)
  return request.post('/cart/clear', {
    cartIds
  })
}
