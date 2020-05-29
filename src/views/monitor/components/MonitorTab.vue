<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <RemoteCard />
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
