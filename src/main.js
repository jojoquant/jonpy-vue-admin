import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

// 注意store要在axios之前import
import axios from "./network/axiosPromiseWrap";
import vuetify from "./plugins/vuetify";

import Highcharts from "highcharts/highcharts";
import HighchartsVue from "highcharts-vue";
import stockInit from "highcharts/modules/stock";
// import stockTools from "highcharts/modules/stock-tools";
import darkUnica from "highcharts/themes/dark-unica";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

darkUnica(Highcharts);
stockInit(Highcharts);
// stockTools(Highcharts)
Vue.use(HighchartsVue);
Highcharts.setOptions({
  global: {
    timezoneOffset: -8 * 60
  },
  lang: {
    rangeSelectorZoom: ""
  }
});

Vue.use(ElementUI); 

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  vuetify,
  axios,
  render: h => h(App)
}).$mount("#app");
