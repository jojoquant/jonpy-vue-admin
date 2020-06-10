<template>
  <v-card>
    <v-row>
      <v-col>
        <StrategyVariablesTable
          :engine_name="engine_name"
          :tab_name="tab_name"
          :strategy_name="strategy_name"
          :strategy_class="strategy_class"
          :strategy_variables="strategy_variables"
          :strategy_arr_index="strategy_arr_index"
        />
      </v-col>
      <v-col>
        <StrategyParametersTable
          :strategy_parameters="strategy_parameters"
          :strategy_arr_index="strategy_arr_index"
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
    strategy_name: String,
    strategy_class: String,
    strategy_variables: Array,
    strategy_parameters: Array,
    strategy_arr_index: Number
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
