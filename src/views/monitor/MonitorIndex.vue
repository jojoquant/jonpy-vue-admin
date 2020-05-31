<template>
  <v-container fluid>
    <v-tabs v-model="tab" background-color="blue-grey darken-3">
      <v-tab v-for="item in monitor.servers" :key="item.name">
        <v-badge :color="item.connect_status?'green':'red'" :content="item.stategy_running_num">
          {{ item.name }}
        </v-badge>
      </v-tab>

      <v-tab-item v-for="item in monitor.servers" :key="item.name">
        <v-card-text class="text-right">
          <v-btn color="red" :value="item.name" @click="removeTab">
            <v-icon>mdi-minus</v-icon>
            删除当前面板
          </v-btn>
          <v-divider class="mx-4" vertical></v-divider>
          <!-- <v-btn @click="addTab">Add Tab</v-btn> -->
          <AddTabDialogButton />
        </v-card-text>

        <MonitorTab :tab_name="item.name" />
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>

import vuex_monitor_types from "../../store/modules/monitor_types"
import {mapState,mapMutations} from "vuex"

export default {
  name: "MonitorIndex",
  components: {
    MonitorTab: () => import("./components/MonitorTab"),
    AddTabDialogButton: () => import("./components/AddTabDialogButton")
  },

  data: () => ({
    length: 3,
    tab: null,
  }),

  computed:{
    ...mapState({
      monitor: state => state.monitor
    })
  },

  methods: {
    ...mapMutations(vuex_monitor_types.name, [
      vuex_monitor_types.remove_server
    ]),
    removeTab(event) {
      if (this.monitor.servers.length == 1) {
        return;
      }
      this.remove_server(event.currentTarget.value)
      // this.servers = _.remove(this.servers, item => {
      //   return item.name != event.currentTarget.value;
      // });
    },
    addTab() {
      console.log(this.tab);
    }
  },

  watch: {
    servers: {
      handler(newValue, oldValue) {
        console.log("watch servers:", newValue, oldValue);
      },
      deep: true
    }
  }
};
</script>
