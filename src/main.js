import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// es兼容 es6 -> es5
import 'babel-polyfill'

// 淘宝适配js
import 'lib-flexible'

// 样式重置
import './common/css/modules/reset.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
