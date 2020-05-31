import self from "./monitor_types";
import _ from "lodash";

const monitor = {
  namespaced: true,

  state: {
    servers: [
      { name: "aliyun", connect_status: false, stategy_running_num: 10 },
      { name: "aliyun2", connect_status: false, stategy_running_num: 2 },
      { name: "aliyun3", connect_status: false, stategy_running_num: 0 }
    ],
    ws_clients: [
      {
        ws_client: null,
        server_name: null,
        wss_url: "",
        engines: [{ name: "默认", stategy_arr: [] }]
      }
    ],
    error: null
  },

  getters: {
    // ws_client: state => state.ws_client
  },

  mutations: {
    [self.__init__](state, { wss_url, tab_name }) {
      console.log("In vuex __init__ mutation:", wss_url, tab_name);
      for (let item in state.ws_clients) {
        if (wss_url === item.wss_url) {
          console.log(`${wss_url} has been in ws_clients of vuex`);
          return;
        }
      }

      let ws_client = new WebSocket(wss_url);
      ws_client.onopen = event => {
        console.log(`vuex ${self.name} websocket connect successful!`);
        console.log(event.target.url);
        let wss_url = event.target.url;
        let cur_tab_name = state.ws_clients.filter(item => {
          return item.wss_url === wss_url;
        })[0].server_name;

        state.servers.map(item => {
          console.log(item, cur_tab_name);
          if (item.name == cur_tab_name) {
            item.connect_status = true;
          }
          return item;
        });
      };

      ws_client.onerror = err => {
        console.log(`vuex ${self.name} websocket error!`);
        console.log(err);
        state.error = err;
      };

      ws_client.onclose = event => {
        console.log(`vuex ${self.name} websocket closed!`);
        // console.log(event);
        // console.log(state.ws_client_obj);

        // 根据url key 去 servers 遍历, 更改对应tab的 connect_status
        let wss_url = event.target.url;
        let cur_tab_name = state.ws_clients.filter(item => {
          return item.wss_url === wss_url;
        })[0].server_name;

        state.servers.map(item => {
          // console.log(item, cur_tab_name)
          if (item.name == cur_tab_name) {
            item.connect_status = false;
          }
          return item;
        });

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

      let update_obj = {
        ws_client: ws_client,
        server_name: tab_name,
        wss_url: wss_url
      };
      if (state.ws_clients[0].wss_url === "") {
        // update_obj.engines = [{ name: "默认" , stategy_arr:[]}]
        Object.assign(state.ws_clients[0], update_obj);
        return;
      }

      update_obj.engines = [{ name: "默认", stategy_arr: [] }];
      state.ws_clients = _.concat(state.ws_clients, update_obj);
    },

    [self.send](state, msg) {
      state.ws_client.send(msg);
    },

    [self.set_error](state, error) {
      state.error = error;
    },

    [self.disconnect](state, wss_url) {
      console.log("ccccccclose");
      state.ws_clients.map(item => {
        if (item.wss_url === wss_url) {
          item.ws_client.close();
        }
        return item
      });
    },

    [self.delete_ws_client](state, url) {
      // delete state.ws_client_obj[key];
      state.ws_clients = _.remove(state.ws_clients, item => {
        return item.wss_url !== url;
      });

      if(state.ws_clients.length === 0){
        state.ws_clients = [
          {
            ws_client: null,
            server_name: null,
            wss_url: "",
            engines: [{ name: "默认", stategy_arr: [] }]
          }
        ]
      }
    },

    [self.add_server](state, obj) {
      console.log(obj);
      state.servers = _.concat(state.servers, obj);
    },

    [self.remove_server](state, val) {
      state.servers = _.remove(state.servers, item => {
        return item.name !== val;
      });
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
      for (let ws_client in state.ws_clients) {
        if (ws_client.tab_name == old_name) {
          ws_client.tab_name = new_name;
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
