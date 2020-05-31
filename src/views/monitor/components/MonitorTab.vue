<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <RemoteCard :tab_name="tab_name" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <StrategyExpansionPanel />
      </v-col>
      <v-col>
        <StrategyExpansionPanel />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props:{
    tab_name:String,
  },
  data() {
    return {};
  },
  components: {
    RemoteCard: () => import("./MonitorTab/RemoteCard"),
    StrategyExpansionPanel: () => import("./MonitorTab/StrategyExpansionPanel")
  },
  methods: {}
};
</script>
