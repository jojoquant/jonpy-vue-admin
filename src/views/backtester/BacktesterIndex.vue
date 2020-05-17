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
  })
};
</script>
