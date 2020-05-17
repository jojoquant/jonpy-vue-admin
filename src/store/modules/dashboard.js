import TYPES from "./dashboard_types";

const dashboard = {
  namespaced: true,

  state: {
    drawer: true,
    drawerItemsArray: [
      { icon: "mdi-apple", appName: "数据导入", route: "/dataloader" },
      { icon: "mdi-ipod", appName: "策略回测", route: "/backtester" },
      { icon: "mdi-apple-icloud", appName: "策略监控" },
      { icon: "settings", appName: "设置" }
    ]
  },

  getters: {},

  mutations: {
    [TYPES.InverseDrawerStatus](state) {
      state.drawer = !state.drawer;
    }
  },

  actions: {
    async InverseDrawerStatus({ commit }) {
      commit(TYPES.InverseDrawerStatus);
    }
  }
};

export default dashboard;
