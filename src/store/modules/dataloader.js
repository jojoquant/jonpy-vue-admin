import self from "./dataloader_types";

const dataloader = {
  namespaced: true,

  state: {
    ws_client: null,
    connected: false,
    error: null,
    contracts: {
      exchanges: ["dd", "aa"],
      symbols: ["RB", "A"],
      periods: [
        "MINUTE",
        "MINUTE_5",
        "MINUTE_15",
        "MINUTE_30",
        "HOUR",
        "DAILY",
        "WEEKLY"
      ]
    }
  },

  getters: {
    ws_client: state => state.ws_client
  },

  mutations: {
    [self.__init__](state, wss_url) {
        state.ws_client = new WebSocket(wss_url)
        
        state.ws_client.onopen = () => {
            console.log("vuex dataloader websocket connect successful!");
            state.connected = true
        };
        
        state.ws_client.onerror = (err) =>{
            console.log("vuex dataloader websocket error!");
            console.log(err)
            state.error = err
        }

        state.ws_client.onclose = () => {
            console.log("vuex dataloader websocket closed!");
            state.connected = false
        }

        state.ws_client.onmessage = (event)=>{
            const re_obj_data = JSON.parse(event.data)
            if('exchanges' in re_obj_data){
                state.contracts.exchanges = re_obj_data.exchanges
            }else if('symbols' in re_obj_data){
                state.contracts.symbols = re_obj_data.symbols
            }
        }
    },

    [self.send](state, msg){
        state.ws_client.send(msg)
    },

    [self.set_error](state, error) {
      state.error = error;
    },

    [self.disconnect](state) {
      state.ws_client.disconnect();
      state.connected = false;
    }
  },

  actions: {
    // 这里异步 actions的方法名 必须和 mutation的方法名一致, 
    // 这样在组件中 ...mapActions(module_name, [types.func]) 才能不用字符串
    async __init__({ commit }, wss_url) {
      commit(self.__init__, wss_url);
    },

    async send({commit}, msg){
        commit(self.send, msg)
    },

    async disconnect({ commit }) {
      commit(self.disconnect);
    }
  }
};

export default dataloader;
