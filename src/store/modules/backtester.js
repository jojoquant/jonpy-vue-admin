import self from "./backtester_types";

const backtester = {
  namespaced: true,

  state: {
    ws_client: null,
    connected: false,
    error: null,
    strategy_array: [],
    exchange_array: [],
    symbol_array: [],
    symbol_name: "金",
    period_array: [],
    data_nums: 0,
    inverse_mode: [],
    backtest_mode: [],
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
      inverse_mode_selected: "",
      backtest_mode_selected: ""
    },
    strategy_setting: {},
    backtest_result: {
      statistics: {
        首个交易日: null,
        最后交易日: null,
        总交易日: null,
        盈利交易日: null,
        亏损交易日: null,
        起始资金: null,
        结束资金: null,
        最大回撤: null,
        百分比最大回撤: null,
        max_drawdown_duration: null,
        总盈亏: null,
        日均盈亏: null,
        总手续费: null,
        日均手续费: null,
        总滑点: null,
        日均滑点: null,
        总成交额: null,
        日均成交额: null,
        总成交笔数: null,
        日均成交笔数: null,
        总收益率: null,
        年化收益: null,
        日均收益率: null,
        收益标准差: null,
        夏普比率: null,
        收益回撤比: null
      },
      balance: {
        data: { x: [], y: [] },
        type: "line"
      },
      trade: {
        headers: [
          {
            text: "成交号",
            align: "start",
            value: "tradeid"
          },
          { text: "委托号", value: "orderid" },
          { text: "代码", value: "symbol" },
          { text: "交易所", value: "exchange" },
          { text: "方向", value: "direction" },
          { text: "开平", value: "offset" },
          { text: "价格", value: "price" },
          { text: "数量", value: "volume" },
          { text: "时间", value: "datetime" },
          { text: "接口", value: "gateway_name" }
        ],
        content:[],
      }
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
        if ("submit_data" in re_obj_data) {
          // 返回的对象, 如果有submit_data字段, 先更新这个字段
          // 然后删除submit_data字段, 在更新其他字段
          // 否则, 返回的submit_data会覆盖state中的原有字段
          Object.assign(state.submit_data, re_obj_data.submit_data);
          delete re_obj_data.submit_data;
        }

        Object.assign(state, re_obj_data);
        // 注意这里更新的两个字段
        // 因为在组件中赋值后再更新vuex.submit_data中的这两字段无法自动触发
        // 尝试了在几个生命周期内都无法实现, 所以这里进行更新
        // 应该是在onOpen的时候后端第一次发回时更新vuex.submit_data, 注意判断条件
        if ("inverse_mode" in re_obj_data && "backtest_mode" in re_obj_data) {
          state.submit_data.inverse_mode_selected = re_obj_data.inverse_mode[0];
          state.submit_data.backtest_mode_selected =
            re_obj_data.backtest_mode[0];
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

    [self.updateStrategy](state, current_strategy) {
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

    [self.updateRate](state, val) {
      console.log("updateRate");
      state.submit_data.rate = Number(val);
    },
    [self.updateSlippage](state, val) {
      console.log("updateSlippage");
      state.submit_data.slippage = Number(val);
    },
    [self.updateSize](state, val) {
      console.log("updateSize");
      state.submit_data.size = Number(val);
    },
    [self.updatePricetick](state, val) {
      console.log("updatePricetick");
      state.submit_data.pricetick = Number(val);
    },
    [self.updateCapital](state, val) {
      console.log("updateCapital");
      state.submit_data.capital = Number(val);
    },

    [self.update_start_datetime](state, val) {
      state.submit_data.start_datetime = val;
    },
    [self.update_end_datetime](state, val) {
      state.submit_data.end_datetime = val;
    },

    [self.update_inverse_mode_selected](state, val) {
      state.submit_data.inverse_mode_selected = val;
    },

    [self.update_backtest_mode_selected](state, val) {
      state.submit_data.backtest_mode_selected = val;
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

    async disconnect({ commit }) {
      commit(self.disconnect);
    }
  }
};

export default backtester;
