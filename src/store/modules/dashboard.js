import TYPES from './dashboard_types'

const dashboard = {

    namespaced:true,

    state:{
        drawer: true,
        sideBarApps: {},
    },

    getters:{

    },

    mutations:{
        [TYPES.InverseDrawerStatus](state){
            // ./src/views/dashboard/components/AppBar.vue
            state.drawer = !state.drawer;
        }
    },
    
    actions:{
        async InverseDrawerStatus({commit}){
            commit(TYPES.InverseDrawerStatus)
        }
    }
}

export default dashboard