const default_server = {
  connect_status: false,
  stategy_running_num: 10,
  wss_url: {
    ip: "192.168.0.104",
    port: "8888",
  },
  wss_client: null,
  engines: [{ name: "默认", strategy_arr: [] }]
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
  update_ip:"update_ip",
  update_port:"update_port",
  update_tab:"update_tab",
  updateStrategy: "updateStrategy",
  changeExchanges: "changeExchanges"
};
