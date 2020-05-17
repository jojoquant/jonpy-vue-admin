<template>
  <v-card indigo>
    <v-row>
      <v-col>
        <BalanceChart id="myChart1" />
      </v-col>
      <v-col>
        <BalanceChart id="myChart2" />
      </v-col>
      <v-col>
        <BalanceChart id="myChart3" />
      </v-col>
      <v-col>
        <BalanceChart id="myChart4" />
      </v-col>
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
