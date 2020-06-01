<template>
  <v-container fluid>
    <v-tabs v-model="tab" background-color="blue-grey darken-3">
      <v-tab v-for="(item,key) in monitor.servers" :key="key">
        <v-badge :color="item.connect_status?'green':'red'" :content="item.stategy_running_num">
          {{ key }}
        </v-badge>
      </v-tab>

      <v-tab-item v-for="(item,key) in monitor.servers" :key="key">
        <v-card-text class="text-right">
          <v-btn color="red" :value="key" @click="removeTab">
            <v-icon>mdi-minus</v-icon>
            删除当前面板
          </v-btn>
          <v-divider class="mx-4" vertical></v-divider>
          <EditTabDialogButton :tab_name="key" />
          <v-divider class="mx-4" vertical></v-divider>
          <AddTabDialogButton />
        </v-card-text>

        <MonitorTab :tab_name="key" />
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import _ from 'lodash'
import vuex_monitor_types from "../../store/modules/monitor_types"
import {mapState,mapMutations} from "vuex"

export default {
  name: "MonitorIndex",
  components: {
    MonitorTab: () => import("./components/MonitorTab"),
    AddTabDialogButton: () => import("./components/AddTabDialogButton"),
    EditTabDialogButton: () => import("./components/EditTabDialogButton"),
  },

  data: () => ({
    tab:null,
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
      if (_.keys(this.monitor.servers).length == 1) {
        console.log("tab num cannot be set to 0")
        return;
      }
      console.log(event.currentTarget.value)
      this.remove_server(event.currentTarget.value)
    },
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
