<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <RemoteCard :tab_name="tab_name" />
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="6"
        v-for="(item, index) in servers[this.tab_name].engines"
        :key="index"
      >
        <StrategyExpansionPanel :engine_name="item.name" :tab_name="tab_name" :engine_index="index" />
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
      servers: state => state.monitor.servers
    })
  },

  methods: {}
};
</script>
