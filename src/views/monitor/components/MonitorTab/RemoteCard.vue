<template>
  <v-card>
    <v-row>
      <v-col cols="7">
        <v-card>
          <v-row>
            <v-col cols="7">
              <v-text-field v-model="ip" dense outlined rounded label="IP">
              </v-text-field>
            </v-col>
            <v-col cols="5">
              <v-text-field v-model="port" dense outlined rounded label="Port">
              </v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="5">
        <v-card>
          <v-row>
            <v-col>
              <v-btn color="success" rounded @click="connect">connect</v-btn>
            </v-col>
            <v-col>
              <v-btn color="error" rounded @click="tab_disconnect"
                >disconnect</v-btn
              >
            </v-col>
          </v-row>

          <!-- <v-divider class="mx-4" vertical></v-divider> -->
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import vuex_monitor_types from "../../../../store/modules/monitor_types";
import { mapState, mapActions } from "vuex";

export default {
  props: {
    tab_name: String
  },
  data() {
    return {
    //   ip: "192.168.0.104",
    //   port: "8888"
    };
  },

  computed: {
    ...mapState({
      monitor: state => state.monitor
    }),
    ip() {
      return this.monitor.servers.map(item => {
        if (item.name === this.tab_name) {
          return item.wss_url.ip;
        }
      })[0];
    },
    port() {
      return this.monitor.servers.map(item => {
        if (item.name === this.tab_name) {
          return item.wss_url.port;
        }
      })[0];
    }
  },

  methods: {
    ...mapActions(vuex_monitor_types.name, [
      vuex_monitor_types.__init__,
      vuex_monitor_types.disconnect
    ]),
    connect() {
      console.log(
        "Connect websocket:",
        this.ip,
        this.port,
        "tab_name:",
        this.tab_name
      );
    //   let wss_url = `ws://${this.ip}:${this.port}/monitor`;
      this.__init__({ ip:this.ip, port:this.port, tab_name: this.tab_name });
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
