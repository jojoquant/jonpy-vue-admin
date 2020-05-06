import TYPES from "./login_types";

const login = {
  namespaced: true,
  state: {
    token: ""
  },
  getters: {},

  mutations: {
    [TYPES.LOGIN](state, data) {
      // do something sync
      localStorage.token = data;
      state.token = data;
    },
    [TYPES.LOGOUT](state) {
      localStorage.removeItem("token");
      state.token = null;
    }
  },

  actions: {}
};
