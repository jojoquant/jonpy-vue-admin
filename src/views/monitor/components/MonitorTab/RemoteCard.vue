<template>
  <v-card>
    <v-row>
      <v-col cols="12" sm="4" md="4">
        <v-text-field
          v-model="ip"
          :disabled="monitor.servers[this.tab_name].connect_status"
          dense
          outlined
          rounded
          label="IP"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="2" md="2">
        <v-text-field
          v-model="port"
          :disabled="monitor.servers[this.tab_name].connect_status"
          dense
          outlined
          rounded
          label="Port"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="2" md="2">
        <v-text-field
          v-model="account"
          :rules="[rules.required, rules.account_len]"
          label="用户名"
          :hint="account_hint"
          counter
          dense
          outlined
          @click:append="show1 = !show1"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="4" md="4">
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required]"
          :type="show1 ? 'text' : 'password'"
          label="密码"
          counter
          dense
          outlined
          @click:append="show1 = !show1"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="2" md="2">
        <v-text-field
          v-model="broker_id"
          :rules="[rules.required, rules.broker_id_len]"
          label="经纪商代码"
          :hint="broker_id_hint"
          counter
          dense
          outlined
          @click:append="show1 = !show1"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="4" md="4">
        <v-text-field
          v-model="author_code"
          :rules="[rules.required]"
          label="授权编码"
          :hint="author_code_hint"
          counter
          dense
          outlined
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-select
          :items="Object.keys(server_info)"
          v-model="ctp_selected"
          :hint="server_info[ctp_selected].info"
          outlined
          dense
          label="CTP 测试环境"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          v-model="server_info[ctp_selected].td_address"
          :rules="[rules.required]"
          label="交易服务器"
          :disabled="ctp_selected == 'real' ? false : true"
          counter
          dense
          outlined
          @click:append="show1 = !show1"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          v-model="server_info[ctp_selected].md_address"
          :rules="[rules.required]"
          label="行情服务器"
          :disabled="ctp_selected == 'real' ? false : true"
          counter
          dense
          outlined
          hide-details
          @click:append="show1 = !show1"
        >
        </v-text-field>
      </v-col>
      <v-col cols="6" offset-md="6" sm="3">
        <v-btn color="success" class="ma-2" rounded @click="connect">connect</v-btn>
        <!-- <v-btn color="success" @click="start_test">start_test</v-btn> -->
      </v-col>
      <v-col cols="6" md="3">
        <v-btn color="error" class="ma-2" rounded @click="tab_disconnect">disconnect</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import vuex_monitor_types from "../../../../store/modules/monitor_types";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  props: {
    tab_name: String
  },
  data() {
    return {
      account: "",
      account_hint: "用户名为长度6位数字",
      password: "",
      broker_id: "9999",
      broker_id_hint: "经纪商代码长度4位数字",
      author_code: "0000000000000000",
      author_code_hint: "授权编码为16个0",
      ctp_selected: "simnow1",
      server_info: {
        simnow1: {
          td_address: "180.168.146.187:10100",
          md_address: "180.168.146.187:10110",
          info: "[电信]看穿式前置，使用监控中心生产秘钥"
        },
        simnow2: {
          td_address: "180.168.146.187:10101",
          md_address: "180.168.146.187:10111",
          info: "[电信]看穿式前置，使用监控中心生产秘钥"
        },
        simnow3: {
          td_address: "218.202.237.33 :10102",
          md_address: "218.202.237.33 :10112",
          info: "[移动]看穿式前置，使用监控中心生产秘钥"
        },
        simnow4: {
          td_address: "180.168.146.187:10130",
          md_address: "180.168.146.187:10131",
          info:
            "[7x24]看穿式前置,使用监控中心生产秘钥,仅为用户提供CTP API测试需求，不提供结算等其它服务。"
        },
        real: {
          td_address: "",
          md_address: "",
          info: "自定义实盘服务器地址"
        }
      },
      show1: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        account_len: v => v.length == 6 || this.account_hint,
        broker_id_len: v => v.length == 4 || this.broker_id_hint
      }
    };
  },

  computed: {
    ...mapState({
      monitor: state => state.monitor
    }),
    ip: {
      get: function() {
        return this.monitor.servers[this.tab_name].wss_url.ip;
      },
      set: function(newVal) {
        console.log(newVal);
        this.update_ip({ tab_name: this.tab_name, ip: newVal });
      }
    },
    port: {
      get: function() {
        return this.monitor.servers[this.tab_name].wss_url.port;
      },
      set: function(newVal) {
        console.log(newVal);
        this.update_port({ tab_name: this.tab_name, port: newVal });
      }
    }
  },

  methods: {
    ...mapActions(vuex_monitor_types.name, [
      vuex_monitor_types.__init__,
      vuex_monitor_types.disconnect,
      vuex_monitor_types.send
    ]),
    ...mapMutations(vuex_monitor_types.name, [
      vuex_monitor_types.update_ip,
      vuex_monitor_types.update_port
    ]),
    connect() {
      console.log(
        "Connect websocket:",
        this.ip,
        this.port,
        "tab_name:",
        this.tab_name
      );
      let payload = { tab_name: this.tab_name, notify_callback: this.$notify };
      this.__init__(payload);
    },
    tab_disconnect() {
      // 注意不要和vuex中的disconnect重名, 否则会形成递归
      console.log("Disconnect websocket:", this.ip, this.port);
      this.disconnect(this.tab_name);
    },
    start_test() {
      let payload = {
        tab_name: this.tab_name,
        msg: JSON.stringify({ start: " " })
      };
      this.send(payload);
    }
  }
};
</script>
