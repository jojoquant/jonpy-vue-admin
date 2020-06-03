<template>
  <v-card>
    <v-card-title primary-title> {{ this.engine_name }}号引擎 </v-card-title>
    <div>
      <!-- <v-checkbox v-model="disabled" label="Disabled"></v-checkbox> -->
      <StrategySelectCard :tab_name="tab_name" :engine_name="engine_name" />

      <v-expansion-panels v-model="panel" :disabled="disabled" multiple>
        <v-expansion-panel v-for="(value, index) in engines[this.engine_name].strategy_arr" :key="index">
          <v-expansion-panel-header>{{value}}</v-expansion-panel-header>
          <v-expansion-panel-content>
            Some content
            <StrategyCard :tab_name="tab_name" :engine_name="engine_name" />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <FabSpeedDial :tab_name="tab_name" :engine_name="engine_name" />
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {
    StrategyCard: () => import("./StrategyExpansionPanel/StrategyCard"),
    StrategySelectCard: () =>
      import("./StrategyExpansionPanel/StrategySelectCard"),
    FabSpeedDial: () => import("./StrategyExpansionPanel/FabSpeedDial")
  },

  props: {
    engine_name: String,
    tab_name: String
  },

  data: () => ({
    panel: [],
    disabled: false,
    readonly: false
  }),

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

  methods: {}
};
</script>
