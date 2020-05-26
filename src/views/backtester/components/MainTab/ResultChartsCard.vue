<template>
  <v-card indigo wrap class="d-flex flex-column aglin-content-around flex-shrink-1 flex-grow-1">
    <!-- <v-row> -->
      <BalanceCurve />
      <DrawdownCurve />
      <PnlBar />
      <PnlDistCurve />
      <!-- <BalanceChart id="myChart2" :option="option" />
      <BalanceChart id="myChart3" :option="option" />
      <BalanceChart id="myChart4" :option="option" /> -->
    <!-- </v-row> -->
  </v-card>
</template>

<script>
export default {
  components: {
    BalanceCurve: () => import("./ResultChartsCard/BalanceCurve"),
    DrawdownCurve: () => import("./ResultChartsCard/DrawdownCurve"),
    PnlBar: () => import("./ResultChartsCard/PnlBar"),
    PnlDistCurve:() => import("./ResultChartsCard/PnlDistCurve")
  },
  data() {
    return {};
  }
};
</script>
