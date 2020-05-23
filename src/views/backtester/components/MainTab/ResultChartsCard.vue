<template>
  <v-card indigo wrap class="d-flex flex-column aglin-content-around flex-shrink-1 flex-grow-1">
    <!-- <v-row> -->
      <BalanceChart />
      <BalanceChart />
      <BalanceChart />
      <BalanceChart />
      <!-- <BalanceChart id="myChart2" :option="option" />
      <BalanceChart id="myChart3" :option="option" />
      <BalanceChart id="myChart4" :option="option" /> -->
    <!-- </v-row> -->
  </v-card>
</template>

<script>
export default {
  components: {
    BalanceChart: () => import("./ResultChartsCard/Balance")
  },
  data() {
    return {};
  }
};
</script>
