const default_server = {
  connect_status: false,
  stategy_running_num: 10,
  wss_url: {
    ip: "192.168.0.104",
    port: "8888"
  },
  wss_client: null,
  strategy_select: [],
  exchange_contract_obj: {},
  notify_callback: function(){},
  engines: { "0": { strategy_arr: [] } }
};

export default {
  name: "monitor",
  default_server: default_server,
  __init__: "__init__",
  send: "send",
  set_error: "set_error",
  disconnect: "disconnect",
  delete_ws_client: "delete_ws_client",
  add_server: "add_server",
  remove_server: "remove_server",
  edit_server_name: "edit_server_name",
  update_ip: "update_ip",
  update_port: "update_port",
  update_tab: "update_tab",
  update_strategy: "update_strategy",
  add_engine: "add_engine",
  edit_engine: "edit_engine",
  remove_engine: "remove_engine",
  add_strategy_to_engine: "add_strategy_to_engine",
  changeExchanges: "changeExchanges"
};
