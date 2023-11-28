import Vue from 'vue'
import VueRouter from 'vue-router'

import layoutIndex from '@/views/layout/index.vue'
import searchIndex from '@/views/search/index.vue'
import searchList from '@/views/search/list.vue'
import productDetailIndex from '@/views/productDetail/index.vue'
import loginIndex from '@/views/login/index.vue'
import payIndex from '@/views/pay/index.vue'
import myOrderIndex from '@/views/myOrder/index.vue'

// 导入首页下的二级路由组件
import homePage from '@/views/layout/home.vue'
import categoryPage from '@/views/layout/category.vue'
import cartPage from '@/views/layout/cart.vue'
import userPage from '@/views/layout/user.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: layoutIndex,
    children: [
      { path: '/home', component: homePage },
      { path: '/category', component: categoryPage },
      { path: '/cart', component: cartPage },
      { path: '/user', component: userPage }
    ]
  },
  {
    path: '/login',
    component: loginIndex
  },
  {
    path: '/search',
    component: searchIndex
  },
  {
    path: '/searchList',
    component: searchList
  },
  {
    path: '/productDetail/:id',
    component: productDetailIndex
  },
  {
    path: '/pay',
    component: payIndex
  },
  {
    path: '/myorder',
    component: myOrderIndex
  }
]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

export default router
