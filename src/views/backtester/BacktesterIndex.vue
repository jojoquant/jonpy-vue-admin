<template>
  <v-row>
    <v-col cols-12 md-2>
      <StrategyInfoCard />
    </v-col>
    <v-col cols-12 md-2>
      <ResultTableCard />
      <br />
      <LogTextareas />
    </v-col>
    <v-col cols-12 md-8>
      <ResultChartCard />
    </v-col>
  </v-row>
</template>

<script>
import vuex_backtester_types from "../../store/modules/backtester_types";
import setting from "../../setting";
import { mapActions } from "vuex";

export default {
  name: "BacktesterIndex",
  components: {
    StrategyInfoCard: () => import("./components/StrategyInfoCard"),
    ResultTableCard: () => import("./components/ResultTableCard"),
    ResultChartCard: () => import("./components/ResultChartsCard"),
    LogTextareas: () => import("./components/LogTextareas")
  },

  data: () => ({
    tag: "我是Backtester模块"
  }),

  beforeMount() {
    this.__init__(
      `ws://${setting.back_end_ip}:${setting.back_end_port}/${vuex_backtester_types.name}`
    );
  },

  methods: {
    ...mapActions(vuex_backtester_types.name, [vuex_backtester_types.__init__])
  }
};
</script>
