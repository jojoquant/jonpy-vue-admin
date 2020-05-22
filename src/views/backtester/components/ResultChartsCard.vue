<template>
  <v-card indigo height="25%">
    <v-row class="fill-height">
      <BalanceChart id="myChart1" :option="option" ref="child" />
      <!-- <BalanceChart id="myChart2" :option="option" />
      <BalanceChart id="myChart3" :option="option" />
      <BalanceChart id="myChart4" :option="option" /> -->
    </v-row>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {
    BalanceChart: () => import("../../../components/echarts")
  },
  data() {
    return {
      name: "balance"
    }
  },
  computed: {
    ...mapState({
      backtester: state => state.backtester
    }),

    option() {
      return {
        xAxis: {
          type: "category",
          data: this.backtester.backtest_result.balance.data.x
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: this.backtester.backtest_result.balance.data.y,
            type: this.backtester.backtest_result.balance.type,
            smooth: true
          }
        ],
        backgroundColor: "#607d8b"
      };
    }
  },
  watch: {
    option() {
      this.$refs.child.updateOption(this.option);
    }
  }
};
</script>
