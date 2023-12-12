import request from '@/utils/request'

// 从后台获取购物车列表
export const getCartList = () => {
  return request.get('/cart/list')
}
// 加入后台购物车列表
// goodsId    => 商品id     iphone8
// goodsSkuId => 商品规格id  红色的iphone8  粉色的iphone8
export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}
// 更新后台购物车商品数量
export const changeCount = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 向后端发送删除购物车商品数据
export const delCart = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
