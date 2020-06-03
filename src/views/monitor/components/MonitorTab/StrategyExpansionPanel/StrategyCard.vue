<template>
  <v-card>
    <v-card-title primary-title>
      StrategyCard
    </v-card-title>
    <v-row>
      <v-col>
        <StrategyVariablesTable />
      </v-col>
      <v-col>
        <StrategyParametersTable />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    engine_name: String,
    tab_name: String
  },
  components: {
    StrategyVariablesTable: () =>
      import("./StrategyCard/StrategyVariablesTable"),
    StrategyParametersTable: () =>
      import("./StrategyCard/StrategyParametersTable")
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
