<template>
  <v-card indigo class="mx-auto" height="25%">
  <!-- <v-container fluid class="d-flex flex-column"> -->
      <BalanceChart id="myChart1" />
      <BalanceChart id="myChart2" />
      <BalanceChart id="myChart3" />
      <BalanceChart id="myChart4" />
  <!-- </v-container> -->

  </v-card>
</template>

<script>
export default {
  components: {
    BalanceChart: () => import("./ResultChartsCard/Balance")
  }
};
</script>
