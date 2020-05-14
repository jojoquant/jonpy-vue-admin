import self from "./dataloader_types";

const dataloader = {
  namespaced: true,

  state: {
    ws_client: null,
    connected: false,
    error: null,
    contracts: {
      exchanges: [],
      exchange_selected: [],
      symbols: [],
      symbols_selected: [],
      periods: [],
      periods_selected: [],
      type: "L8"
    },
    time_format: "",
    export_to: ["to_db", "to_csv"]
  },

  getters: {
    ws_client: state => state.ws_client
  },

  mutations: {
    [self.__init__](state, wss_url) {
      state.ws_client = new WebSocket(wss_url);

      state.ws_client.onopen = () => {
        console.log("vuex dataloader websocket connect successful!");
        state.connected = true;
      };

      state.ws_client.onerror = err => {
        console.log("vuex dataloader websocket error!");
        console.log(err);
        state.error = err;
      };

      state.ws_client.onclose = () => {
        console.log("vuex dataloader websocket closed!");
        state.connected = false;
      };

      state.ws_client.onmessage = event => {
        const re_obj_data = JSON.parse(event.data);
        if ("exchanges" in re_obj_data) {
          state.contracts.exchanges = re_obj_data.exchanges;
        } 
        if ("symbols" in re_obj_data) {
          state.contracts.symbols = re_obj_data.symbols;
        } 
        if ("periods" in re_obj_data) {
          state.contracts.periods = re_obj_data.periods;
        } 
        if ("time_format" in re_obj_data){
          state.time_format = re_obj_data.time_format
        } 
        if ("export_to" in re_obj_data){
          state.export_to = re_obj_data.export_to
        } 
      };
    },

    [self.send](state, msg) {
      state.ws_client.send(msg);
    },

    [self.set_error](state, error) {
      state.error = error;
    },

    [self.disconnect](state) {
      state.ws_client.disconnect();
      state.connected = false;
    },

    [self.updateTimeFormat](state, new_time_formate_str) {
      state.time_format = new_time_formate_str;
    },

    [self.updateContractType](state, new_contract_type_str) {
      state.contracts.type = new_contract_type_str;
    },

    [self.changeExchanges](state, current_exchange) {
      state.contracts.exchange_selected = current_exchange;
    },

    [self.changeSymbols](state, current_symbols) {
      state.contracts.symbols_selected = current_symbols;
    },

    [self.changePeriods](state, current_periods) {
      state.contracts.periods_selected = current_periods;
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

    async disconnect({ commit }) {
      commit(self.disconnect);
    }
  }
};

export default dataloader;
