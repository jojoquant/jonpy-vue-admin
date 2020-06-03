<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <RemoteCard :tab_name="tab_name" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6" v-for="(item, key) in engines" :key="key">
        <StrategyExpansionPanel :engine_name="key" :tab_name="tab_name" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    tab_name: String
  },

  components: {
    RemoteCard: () => import("./MonitorTab/RemoteCard"),
    StrategyExpansionPanel: () => import("./MonitorTab/StrategyExpansionPanel")
  },

  data() {
    return {};
  },

  computed: {
    ...mapState({
      engines(state) {
        // 为了能使用props中的tab_name, 这里一改以往的箭头函数写法
        // console.log("in engines computed, state.monitor.servers[this.tab_name].engines is")
        // console.log(state.monitor.servers[this.tab_name].engines)
        return state.monitor.servers[this.tab_name].engines;
      }
    })
  },

  methods: {},

  watch: {
    engines: {
      handler(newValue, oldValue) {
        console.log("watch engines:", newValue, oldValue);
      },
      deep: true
    }
  }
};
</script>
