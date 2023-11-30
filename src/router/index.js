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

import store from '@/store'

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
// 创建VueRouter实例
const router = new VueRouter({
  mode: 'history',
  routes: routes
})
// 所有的路由在真正被访问到之前(解析渲染对应组件页面前)，都会先经过全局前置守卫
// 只有全局前置守卫放行了，才会到达对应的页面

// 全局前置导航守卫
// to:   到哪里去，到哪去的完整路由信息对象 (路径，参数)
// from: 从哪里来，从哪来的完整路由信息对象 (路径，参数)
// next(): 是否放行
// (1) next()     直接放行，放行到to要去的路径
// (2) next(路径)  进行拦截，拦截到next里面配置的路径

// 定义一个数组，专门用户存放所有需要权限访问的页面
const authUrls = ['/pay', '/myorder']

router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  // 看 to.path 是否在 authUrls 中出现过
  if (!authUrls.includes(to.path)) {
    // 非权限页面，直接放行
    next()
    return
  }
  // 是权限页面，需要判断token
  const token = store.state.user.userInfo.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})
export default router
