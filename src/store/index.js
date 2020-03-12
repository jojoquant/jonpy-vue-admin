import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dashboardCoreDrawer: true,
    token:'',
    sideBarApps:{
      
    },
  },

  mutations: {
    // ./src/views/dashboard/components/AppBar.vue
    inverseDashboardCoreDrawer(state) {
      state.dashboardCoreDrawer = !state.dashboardCoreDrawer
    },

    [types.LOGIN]:(state, data) =>{
      localStorage.token = data
      state.token = data
    },

    [types.LOGOUT]:(state)=>{
      localStorage.removeItem('token')
      state.token = null
    },

  },

  actions: {
  },

  modules: {
  },
})
