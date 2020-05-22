<template>
  <v-row d-flex align="stretch" justify-space-around wrap>
    <v-col cols="3">
      <StrategyInfoCard />
    </v-col>
    <v-col cols="3" justify-space-between>
      <ResultTableCard />
      <br />
      <LogTextareas />
    </v-col>
    <v-col cols="6">
      <ResultChartCard />
    </v-col>
  </v-row>
</template>

<script>
import vuex_backtester_types from "../../../store/modules/backtester_types";
import setting from "../../../setting";
import { mapActions } from "vuex";

export default {
  name: "BacktesterIndex",
  components: {
    StrategyInfoCard: () => import("./MainTab/StrategyInfoCard"),
    ResultTableCard: () => import("./MainTab/ResultTableCard"),
    ResultChartCard: () => import("./MainTab/ResultChartsCard"),
    LogTextareas: () => import("./MainTab/LogTextareas")
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
