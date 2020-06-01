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
export default {
  props: {
    tab_name: String
  },
  data() {
    return {
      engines: [{ name: "默认" }]
    };
  },
  components: {
    RemoteCard: () => import("./MonitorTab/RemoteCard"),
    StrategyExpansionPanel: () => import("./MonitorTab/StrategyExpansionPanel")
  },
  computed: {},
  methods: {}
};
</script>
