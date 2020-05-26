<template>
  <v-card indigo class="mx-auto" height="200">
    <highcharts
      :options="chartOptions"
      ref="balanceChart"
      style="width:0; height:0"
    ></highcharts>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      name: "balance"
    };
  },
  methods: {
    resize() {
      this.$refs.balanceChart.$el.style.width = "100%";
      this.$refs.balanceChart.$el.style.height = "100%";
      this.$refs.balanceChart.chart.reflow();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.resize();
    });
  },
  computed: {
    ...mapState({
      backtester: state => state.backtester
    }),

    chartOptions: function() {
      return {
        xAxis: [
          {
            type: "category",
            categories: this.backtester.backtest_result.balance.data.x,
            index: 0,
            isX: true
          }
        ],
        series: [
          {
            name: "",
            data: this.backtester.backtest_result.balance.data.y,
            _colorIndex: 0,
            _symbolIndex: 0
          }
        ],
        yAxis: [
          {
            title: {
              text: ""
            },
            index: 0,
            min: Math.min.apply(
              null,
              this.backtester.backtest_result.balance.data.y
            ),
            max: Math.max.apply(
              null,
              this.backtester.backtest_result.balance.data.y
            )
          }
        ],
        chart: {
          style: {
            fontFamily: '"微软雅黑", Arial, Helvetica, sans-serif',
            color: "#333",
            fontSize: "12px",
            fontWeight: "normal",
            fontStyle: "normal"
          },
          zoomType: "x"
        },
        title: {
          text: this.name,
          x: -20
        },
        subtitle: {
          text: "",
          x: -20
        },
        tooltip: {
          valueSuffix: ""
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle"
        },
        plotOptions: {
          series: {
            animation: false,
            turboThreshold: this.backtester.backtest_result.balance.data.x
              .length
          }
        }
      };
    }
  },

  // watch: {
  //   chartOptions() {
  //     this.resize();
  //   }
  // }
};
</script>
