<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <RemoteCard :tab_name="tab_name" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6" v-for="(item, index) in this.engines" :key="index">
        <StrategyExpansionPanel :engine_name="item.name" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import vuex_monitor_types from "../../../store/modules/monitor_types";
import { mapState } from "vuex";

export default {
  props: {
    tab_name: String
  },
  data() {
    return {
      engines:[
            {name:"默认"}
          ]
    };
  },
  components: {
    RemoteCard: () => import("./MonitorTab/RemoteCard"),
    StrategyExpansionPanel: () => import("./MonitorTab/StrategyExpansionPanel")
  },
  computed: {
    ...mapState({ monitor: state => state.monitor }),
    // engines: {
    //   get() {
    //     return [{ name: "默认引擎" }];
    //   },
    //   set() {
    //     for (let item in this.monitor.ws_client_obj) {
    //       if (item.tab_name == this.tab_name) {
    //         return item.engines;
    //       }
    //     }
    //     // return [{name:"默认引擎"}]
    //   }
    // }
  },
  methods: {}
};
</script>
