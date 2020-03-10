import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {request} from './network/request'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

request({
  url:'/',
  success:(res) => {
    console.log(res)
  }
}).then(function(res){
  console.log(res)
})