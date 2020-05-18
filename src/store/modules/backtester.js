import self from "./backtester_types";

const dataloader = {
  namespaced: true,

  state: {
    ws_client: null,
    connected: false,
    error: null,
    strategy_array: ["bollstrategy", "MACD", "RSI"],
    exchange_array: ["DCE", "DCE1"],
    symbol_array: ["A", "B", "RB"],
    symbol_name: "金",
    period_array: ["MIN", "HOUR"],
    data_nums: 100,
    inverse_mode: ["正向", "反向"],
    backtest_mode: ["Thread回测", "Debug回测"],
    submit_data: {
      strategy: [],
      exchange: [],
      symbol: [],
      period: [],
      start_datetime: "",
      end_datetime: "",
      rate: 0.0002,
      slippage: 0,
      size: 10,
      pricetick: 1,
      capital: 1000000,
      inverse_mode_selected: "正向",
      backtest_mode_selected: "Debug回测"
    },
    progress: 0
  },

  getters: {
    ws_client: state => state.ws_client
  },

  mutations: {
    [self.__init__](state, wss_url) {
      if (state.ws_client == null) {
        state.ws_client = new WebSocket(wss_url);
      }

      state.ws_client.onopen = () => {
        console.log(`vuex ${self.name} websocket connect successful!`);
        state.connected = true;
      };

      state.ws_client.onerror = err => {
        console.log(`vuex ${self.name} websocket error!`);
        console.log(err);
        state.error = err;
      };

      state.ws_client.onclose = () => {
        console.log(`vuex ${self.name} websocket closed!`);
        state.connected = false;
      };

      state.ws_client.onmessage = event => {
        const re_obj_data = JSON.parse(event.data);
        Object.assign(state, re_obj_data)
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
      state.submit_data.time_format = new_time_formate_str;
    },

    [self.updateContractType](state, new_contract_type_str) {
      state.contracts.type = new_contract_type_str;
      state.submit_data.type = new_contract_type_str;
    },

    [self.changeExchanges](state, current_exchange) {
      state.submit_data.exchange_selected = current_exchange;
    },

    [self.changeSymbols](state, current_symbols) {
      state.submit_data.symbols_selected = current_symbols;
    },

    [self.changePeriods](state, current_periods) {
      state.submit_data.periods_selected = current_periods;
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
