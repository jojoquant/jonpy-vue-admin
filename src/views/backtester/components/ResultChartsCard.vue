<template>
  <v-card indigo class="mx-auto">
    <v-row>
      <BalanceChart id="myChart1" />
      <BalanceChart id="myChart2" />
      <BalanceChart id="myChart3" />
      <BalanceChart id="myChart4" />
    </v-row>
  </v-card>
</template>

<script>
export default {
  components: {
    BalanceChart: () => import("./ResultChartsCard/Balance")
  }
};
</script>
