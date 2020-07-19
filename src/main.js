import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
Object.defineProperty(Vue.prototype, '$moment', { value: moment })

new Vue({
  render: h => h(App)
}).$mount('#app')
