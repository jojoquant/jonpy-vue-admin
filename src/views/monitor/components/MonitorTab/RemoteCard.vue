<template>
  <v-card>
    <v-row>
      <v-col cols="4">
        <v-text-field v-model="ip" dense outlined rounded label="IP">
        </v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field v-model="port" dense outlined rounded label="Port">
        </v-text-field>
      </v-col>
      <v-col cols="2">
        <v-btn color="success" @click="connect">connect</v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn color="error" @click="tab_disconnect">disconnect</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import vuex_monitor_types from "../../../../store/modules/monitor_types";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      ip: "192.168.0.104",
      port: "8888"
    };
  },
  methods: {
    ...mapActions(vuex_monitor_types.name, [
      vuex_monitor_types.__init__,
      vuex_monitor_types.disconnect
    ]),
    connect() {
      console.log("Connect websocket:", this.ip, this.port);
      let wss_url = `ws://${this.ip}:${this.port}/monitor`;
      this.__init__(wss_url);
    },
    tab_disconnect() {
      // 注意不要和vuex中的disconnect重名, 否则会形成递归
      console.log("Disconnect websocket:", this.ip, this.port);
      let wss_url = `ws://${this.ip}:${this.port}/monitor`;
      this.disconnect(wss_url);
    }
  }
};
</script>
