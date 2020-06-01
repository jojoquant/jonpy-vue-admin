import self from "./monitor_types";
import _ from "lodash";

const monitor = {
  namespaced: true,
  state: {
    servers: {
      aliyun1: self.default_server,
      aliyun2: self.default_server
    },
    error: null,
  },

  getters: {
    // wss_client: state => state.wss_client
  },

  mutations: {
    [self.__init__](state, { ip, port, tab_name }) {
      console.log("In vuex __init__ mutation:", ip, port, tab_name);
      // 遍历当前servers array, 如果wss_url在array中, 退出
      for (let item in state.servers) {
        console.log("item.wss_url.value: ", item.wss_url.value());
        if (ip === item.wss_url.ip && port === item.wss_url.port) {
          console.log(`${ip}:${port} has been in ws_clients of vuex`);
          return;
        }
      }

      // wss_url不在array中, 建立wss_client
      let wss_url = `ws://${ip}:${port}/monitor`;
      state.server;
      let wss_client = new WebSocket(wss_url);

      wss_client.onopen = event => {
        console.log(`vuex ${self.name} websocket connect successful!`);
        console.log(event.target.url);
        let wss_url = event.target.url;

        state.servers.map(item => {
          if (item.wss_url === wss_url) {
            item.connect_status = true;
          }
          return item;
        });
      };

      wss_client.onerror = err => {
        console.log(`vuex ${self.name} websocket error!`);
        console.log(err);
        state.error = err;
      };

      wss_client.onclose = event => {
        console.log(`vuex ${self.name} websocket closed!`);
        // 根据url key 去 servers 遍历, 更改对应tab的 connect_status
        let wss_url = event.target.url;

        state.servers.map(item => {
          // console.log(item, cur_tab_name)
          if (item.wss_url == wss_url) {
            item.connect_status = false;
          }
          return item;
        });

        // 这里如果这么写, 功能能实现, 但是vuex浏览器插件无法看到效果
        // delete state.ws_client_obj[event.target.url]
        // 'monitor/delete_ws_client'
        // this.commit(`${self.name}/${self.delete_ws_client}`, event.target.url);
      };

      wss_client.onmessage = event => {
        const re_obj_data = JSON.parse(event.data);
        console.log("recv data");
        console.log(re_obj_data);
        Object.assign(state, re_obj_data);
      };

      let update_obj = {
        wss_client: wss_client,
        server_name: tab_name,
        wss_url: wss_url
      };
      // if (state.ws_clients[0].wss_url === "") {
      //   // update_obj.engines = [{ name: "默认" , stategy_arr:[]}]
      //   Object.assign(state.ws_clients[0], update_obj);
      //   return;
      // }

      update_obj.engines = [{ name: "默认", stategy_arr: [] }];
      state.ws_clients = _.concat(state.ws_clients, update_obj);
    },

    [self.send](state, msg) {
      state.wss_client.send(msg);
    },

    [self.set_error](state, error) {
      state.error = error;
    },

    [self.disconnect](state, wss_url) {
      console.log("ccccccclose");
      state.ws_clients.map(item => {
        if (item.wss_url === wss_url) {
          item.wss_client.close();
        }
        return item;
      });
    },

    // [self.delete_ws_client](state, url) {
    //   // delete state.ws_client_obj[key];
    //   state.ws_clients = _.remove(state.ws_clients, item => {
    //     return item.wss_url !== url;
    //   });

    //   if (state.ws_clients.length === 0) {
    //     state.ws_clients = ws_clients_default_arr;
    //   }
    // },

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
      console.log("old_name, new_name : ", old_name, new_name);
      // 更新servers Array
      state.servers.map(item => {
        if (item.name == old_name) {
          item.name = new_name;
        }
        return item;
      });

      // 更新ws_client_obj
      for (let wss_client in state.ws_clients) {
        if (wss_client.tab_name == old_name) {
          wss_client.tab_name = new_name;
          console.log(state.ws_clients);
        }
      }
    },

    [self.update_dialog_strategy_setting](state, obj) {
      Object.assign(state.strategy_setting, obj);
    }
  },

  actions: {
    // 这里异步 actions的方法名 必须和 mutation的方法名一致,
    // 这样在组件中 ...mapActions(module_name, [types.func]) 才能不用字符串
    async __init__({ commit }, { wss_url, tab_name }) {
      // console.log("In vuex actions __init__:", wss_url, tab_name)
      commit(self.__init__, { wss_url, tab_name });
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
