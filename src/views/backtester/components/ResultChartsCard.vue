<template>
  <v-card indigo height="25%">
    <v-row class="fill-height">
      <BalanceChart id="myChart1" :option="option" />
      <BalanceChart id="myChart2" :option="option" />
      <BalanceChart id="myChart3" :option="option" />
      <BalanceChart id="myChart4" :option="option" />
    </v-row>
  </v-card>
</template>

<script>
export default {
  components: {
    BalanceChart: () => import("../../../components/echarts")
  },
  data() {
    return {
      option:{
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "bar",
            smooth: true
          }
        ],
        backgroundColor: "#607d8b"
      },
    }
  },
};
</script>
