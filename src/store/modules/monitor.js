import self from "./monitor_types";
import _ from "lodash";

const monitor = {
  namespaced: true,
  state: {
    servers: {
      aliyun1: JSON.parse(JSON.stringify(self.default_server)),
      aliyun2: JSON.parse(JSON.stringify(self.default_server))
    },
    tab: 0,
    error: null
  },

  getters: {
    // wss_client: state => state.wss_client
  },

  mutations: {
    [self.__init__](state, payload) {
      let { tab_name, notify_callback } = payload;
      // 遍历当前servers array, 如果wss_url在array中, 退出
      console.log("In vuex __init__ mutation:", tab_name);

      if (state.servers[tab_name].wss_client !== null) {
        // 已经连接, 退出
        return;
      } else if (state.servers[tab_name].wss_client === null) {
        let wss_url = `ws://${state.servers[tab_name].wss_url.ip}:${state.servers[tab_name].wss_url.port}/monitor`;
        let wss_client = new WebSocket(wss_url);
        state.servers[tab_name].wss_client = wss_client;

        wss_client.onopen = () => {
          console.log(`vuex ${self.name} websocket connect successful!`);
          // console.log(event.target.url);
          // onopen 能准确访问到外面的tab_name, 利用这个, 将connect_status同步更新
          // console.log("In onopen, tab_name:", tab_name)
          state.servers[tab_name].connect_status = true;
          notify_callback({
            title: "成功",
            message: `${tab_name}\n${state.servers[tab_name].wss_url.ip}:${state.servers[tab_name].wss_url.port} 建立连接`,
            type: "success"
          });
        };

        wss_client.onerror = err => {
          console.log(`vuex ${self.name} websocket error!`);
          console.log(err);
          state.error = err;
          notify_callback({
            title: "错误",
            message: `${tab_name}\n${state.servers[tab_name].wss_url.ip}:${state.servers[tab_name].wss_url.port} 连接错误`,
            type: "error"
          })
        };

        wss_client.onclose = event => {
          console.log(`vuex ${self.name} websocket closed!`, event);
          // 根据onopen中的修改, 在这里用同样的方法更新connect_status
          state.servers[tab_name].connect_status = false;
          state.servers[tab_name].wss_client = null;
          notify_callback({
            title: "信息",
            message: `${tab_name}\n${state.servers[tab_name].wss_url.ip}:${state.servers[tab_name].wss_url.port} 连接关闭`,
            type: "info"
          })
        };

        wss_client.onmessage = event => {
          const re_obj_data = JSON.parse(event.data);
          console.log("recv data");
          console.log(re_obj_data);
          Object.assign(state, re_obj_data);
        };
      }
    },

    [self.send](state, msg) {
      state.wss_client.send(msg);
    },

    [self.set_error](state, error) {
      state.error = error;
    },

    [self.disconnect](state, tab_name) {
      console.log("ccccccclose");
      state.servers[tab_name].wss_client.close();
    },

    [self.add_server](state, { key, obj }) {
      console.log(key, obj);
      if (!(key in state.servers)) {
        state.servers[key] = obj;
      }
    },

    [self.remove_server](state, val) {
      delete state.servers[val];
    },

    [self.edit_server_name](state, { old_name, new_name }) {
      // console.log("old_name, new_name : ", old_name, new_name);
      state.servers = _.mapKeys(state.servers, (_, key) => {
        if (key === old_name) {
          return new_name;
        }
        return key;
      });
    },

    [self.update_ip](state, payload) {
      console.log("vuex update ip :", payload);
      let { tab_name, ip } = payload;
      state.servers[tab_name].wss_url.ip = ip;
    },

    [self.update_port](state, payload) {
      console.log("vuex update port :", payload);
      let { tab_name, port } = payload;
      state.servers[tab_name].wss_url.port = port;
    },

    [self.update_tab](state, val) {
      state.tab += val;
    },

    [self.update_dialog_strategy_setting](state, obj) {
      Object.assign(state.strategy_setting, obj);
    }
  },

  actions: {
    // 这里异步 actions的方法名 必须和 mutation的方法名一致,
    // 这样在组件中 ...mapActions(module_name, [types.func]) 才能不用字符串
    async __init__({ commit }, payload) {
      // console.log("In vuex actions __init__:", wss_url, tab_name)
      commit(self.__init__, payload);
    },

    async send({ commit }, msg) {
      commit(self.send, msg);
    },

    async disconnect({ commit }, tab_name) {
      commit(self.disconnect, tab_name);
    }
  }
};

export default monitor;
