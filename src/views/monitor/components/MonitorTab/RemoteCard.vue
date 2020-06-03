<template>
  <v-card>
    <v-row>
      <v-col cols="7">
        <v-card>
          <v-row>
            <v-col cols="12" sm="6" md="6">
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
            <v-col cols="12" sm="6" md="6">
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
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="5">
        <!-- <v-card> -->
          <!-- <v-row>
            <v-col> -->
              <v-btn color="success" class="ma-2" rounded @click="connect">connect</v-btn>
            <!-- </v-col>
            <v-col> -->
              <v-btn color="error" class="ma-2" rounded @click="tab_disconnect"
                >disconnect</v-btn
              >
            <!-- </v-col>
          </v-row> -->

          <!-- <v-divider class="mx-4" vertical></v-divider> -->
        <!-- </v-card> -->
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
    return {};
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
      vuex_monitor_types.disconnect
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
      let payload = {tab_name:this.tab_name, notify_callback:this.$notify}
      this.__init__(payload);
    },
    tab_disconnect() {
      // 注意不要和vuex中的disconnect重名, 否则会形成递归
      console.log("Disconnect websocket:", this.ip, this.port);
      this.disconnect(this.tab_name);
    }
  }
};
</script>
