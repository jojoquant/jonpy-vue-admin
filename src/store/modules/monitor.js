import self from "./monitor_types";

const monitor = {
  namespaced: true,

  state: {
    ws_client_obj: {},
    connected: false,
    error: null,
    strategy_array: [],
    strategy_setting: {},
    progress: 0
  },

  getters: {
    // ws_client: state => state.ws_client
  },

  mutations: {
    [self.__init__](state, wss_url) {
      console.log(wss_url);
      if (!(wss_url in state.ws_client_obj)) {
        let ws_client = new WebSocket(wss_url);
        state.ws_client_obj[wss_url] = { ws_client: ws_client };

        ws_client.onopen = () => {
          console.log(`vuex ${self.name} websocket connect successful!`);
          state.connected = true;
        };

        ws_client.onerror = err => {
          console.log(`vuex ${self.name} websocket error!`);
          console.log(err);
          state.error = err;
        };

        ws_client.onclose = event => {
          console.log(`vuex ${self.name} websocket closed!`);
          console.log(event);
          console.log(state.ws_client_obj);

          // 这里如果这么写, 功能能实现, 但是vuex浏览器插件无法看到效果
          // delete state.ws_client_obj[event.target.url]

          // 'monitor/delete_ws_client'
          this.commit(`${self.name}/${self.delete_ws_client}`, event.target.url);
          
          console.log(state.ws_client_obj);
        };

        ws_client.onmessage = event => {
          const re_obj_data = JSON.parse(event.data);
          console.log("recv data");
          console.log(re_obj_data);
          Object.assign(state, re_obj_data);
        };
      }
    },

    [self.send](state, msg) {
      state.ws_client.send(msg);
    },

    [self.set_error](state, error) {
      state.error = error;
    },

    [self.disconnect](state, wss_url) {
      console.log("ccccccclose")
      state.ws_client_obj[wss_url].ws_client.close();
    },

    [self.delete_ws_client](state, key) {
      delete state.ws_client_obj[key];
    },

    [self.update_dialog_strategy_setting](state, obj) {
      Object.assign(state.strategy_setting, obj);
    }
  },

  actions: {
    // 这里异步 actions的方法名 必须和 mutation的方法名一致,
    // 这样在组件中 ...mapActions(module_name, [types.func]) 才能不用字符串
    async __init__({ commit }, wss_url) {
      commit(self.__init__, wss_url);
    },

    async send({ commit }, msg) {
      commit(self.send, msg);
    },

    async disconnect({ commit }, wss_url) {
      commit(self.disconnect, wss_url);
    }
  }
};

export default monitor;
