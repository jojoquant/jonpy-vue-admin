<template>
  <v-row>
    <v-col>
      <StrategyInfoCard />
    </v-col>
    <v-col>
      <ResultTableCard />
    </v-col>
    <v-col>
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
    ResultChartCard: () => import("./components/ResultChartsCard")
  },

  data: () => ({
    tag: "我是Backtester模块"
  })
};
</script>
