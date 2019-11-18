import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './http'
import Vant, { Lazyload, Toast } from 'vant'
import config from '@/utils/configs.js'
import 'vant/lib/index.css'
import './rem'
// 自定义引入公共组件
import Components from '@/utils/components.js'
// 注册时设置`lazyComponent`选项

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$Store = store
Vue.prototype.$config = config

Vue.use(Components)
Vue.use(Vant)

Toast.setDefaultOptions('loading', { forbidClick: true })
Vue.use(Lazyload, {
  lazyComponent: true
})

// 定义全局过滤器
// 金额过滤(保留两位小数)
Vue.filter('numToFloat', function (value) {
  return parseFloat(value).toFixed(2)
})
// 金额过滤(整数)
Vue.filter('numToInt', function (value) {
  return parseInt(value)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
