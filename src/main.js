import Vue from 'vue' // vue的一个不完整js包，默认不包含渲染器，体积小一些
import App from './App.vue' // 顶层组件，管理其他组件（组件嵌套最顶层）
import router from './router' // 路由组件
import store from './store' // vuex,数据仓库，内存中，所有组件访问
import '@/utils/vant-ui' // vant-ui组件，移动端vue组件库

// 关闭生产提示
Vue.config.productionTip = false

// 创建vm实例,传入配置对象，并挂载
new Vue({
  router,
  store,
  render: h => h(App) // 渲染函数,vm中需要，vc中template可以自己渲染不需要
}).$mount('#app')
