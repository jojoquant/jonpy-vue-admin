import self from "./monitor_types";
import _ from "lodash";

const monitor = {
  namespaced: true,
  state: {
    servers: {
      aliyun1: JSON.parse(JSON.stringify(self.default_server)),
      aliyun2: JSON.parse(JSON.stringify(self.default_server))
    },
    error: null
  },

  getters: {
    // wss_client: state => state.wss_client
  },

  mutations: {
    [self.__init__](state, tab_name) {
      // 遍历当前servers array, 如果wss_url在array中, 退出
      console.log("In vuex __init__ mutation:", tab_name);

      if (state.servers[tab_name].wss_client !== null) {
        // 已经连接, 退出
        return;
      } else if (state.servers[tab_name].wss_client === null) {
        let wss_url = `ws://${state.servers[tab_name].wss_url.ip}:${state.servers[tab_name].wss_url.port}/monitor`;
        let wss_client = new WebSocket(wss_url);
        state.servers[tab_name].wss_client = wss_client;

        wss_client.onopen = event => {
          console.log(`vuex ${self.name} websocket connect successful!`);
          console.log(event.target.url);
          
          let wss_url = event.target.url;

          for(let key in state.servers){
            let item = state.servers[key]
            if (`ws://${item.wss_url.ip}:${item.wss_url.port}/${self.name}` === wss_url) {
            //TODO 这里没有vuex显示  
            item.connect_status = true;
            }
          }
        };

        wss_client.onerror = err => {
          console.log(`vuex ${self.name} websocket error!`);
          console.log(err);
          state.error = err;
        };

        wss_client.onclose = event => {
          console.log(`vuex ${self.name} websocket closed!`, event);
          // 根据url key 去 servers 遍历, 更改对应tab的 connect_status
          let wss_url = event.target.url;
          for(let key in state.servers){
            let item = state.servers[key]
            if (`ws://${item.wss_url.ip}:${item.wss_url.port}/${self.name}` === wss_url) {
              item.connect_status = false;
              item.wss_client = null
            }
          }
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
      state.servers[tab_name].wss_client.close()
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
