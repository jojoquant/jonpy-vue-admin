<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <RemoteCard />
      </v-col>
      <!-- <v-col> -->
        <!-- <StrategySelectCard /> -->
      <!-- </v-col> -->
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
    // StrategySelectCard: () => import("./MonitorTab/StrategySelectCard"),
    // StrategyCard: () => import("./MonitorTab/StrategyCard"),
    StrategyExpansionPanel: () => import("./MonitorTab/StrategyExpansionPanel")
  },
  methods: {}
};
</script>
