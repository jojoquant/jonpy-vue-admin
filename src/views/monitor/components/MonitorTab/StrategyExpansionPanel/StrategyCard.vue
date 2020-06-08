<template>
  <v-card>
    <v-card-title primary-title>
      StrategyCard
    </v-card-title>
    <v-row>
      <v-col>
        <StrategyVariablesTable
          :strategy_variables="strategy_variables"
        />
      </v-col>
      <v-col>
        <StrategyParametersTable
          :strategy_parameters="strategy_parameters"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    engine_name: String,
    tab_name: String,
    strategy_variables: Array,
    strategy_parameters: Array
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
