import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

// 注意store要在axios之前import
import axios from './network/axiosPromiseWrap'
import vuetify from './plugins/vuetify';

import Highchart from "highcharts/highcharts"
import HighchartsVue from 'highcharts-vue'
import stockInit from "highcharts/modules/stock"

stockInit(Highchart)
Vue.use(HighchartsVue)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  axios,
  render: h => h(App)
}).$mount('#app')

