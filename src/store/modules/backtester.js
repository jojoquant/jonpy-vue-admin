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
      strategy: "",
      exchange: "",
      symbol: "",
      period: "",
      start_datetime: "",
      end_datetime: "",
      rate: 0.0002,
      slippage: 0.0,
      size: 10.0,
      pricetick: 1.0,
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
        console.log(re_obj_data);
        if ("submit_data" in re_obj_data) {
          // 返回的对象, 如果有submit_data字段, 先更新这个字段
          // 然后删除submit_data字段, 在更新其他字段
          // 否则, 返回的submit_data会覆盖state中的原有字段
          Object.assign(state.submit_data, re_obj_data.submit_data)
          delete re_obj_data.submit_data
        }
        console.log(re_obj_data)
        Object.assign(state, re_obj_data);
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

    [self.changeStrategy](state, current_strategy) {
      // change strategy used in backtester
      state.submit_data.strategy = current_strategy;
    },

    [self.changeExchanges](state, current_exchange) {
      // change exchange used in backtester
      state.submit_data.exchange = current_exchange;
    },

    [self.changeSymbols](state, current_symbol) {
      state.submit_data.symbol = current_symbol;
    },

    [self.changePeriods](state, current_period) {
      state.submit_data.period = current_period;
    },

    [self.updateRate](state, val){
      console.log("updateRate")
      state.submit_data.rate = Number(val)
    },
    [self.updateSlippage](state, val){
      console.log("updateSlippage")
      state.submit_data.slippage = Number(val)
    },
    [self.updateSize](state, val){
      console.log("updateSize")
      state.submit_data.size = Number(val)
    },
    [self.updatePricetick](state, val){
      console.log("updatePricetick")
      state.submit_data.pricetick = Number(val)
    },
    [self.updateCapital](state, val){
      console.log("updateCapital")
      state.submit_data.capital = Number(val)
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
