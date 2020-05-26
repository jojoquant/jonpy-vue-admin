<template>
  <v-card indigo class="mx-auto" height="200">
    <highcharts
      :options="chartOptions"
      ref="child"
      style="width:0; height:0"
    ></highcharts>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      name: "pnl"
    };
  },
  methods: {
    resize() {
      this.$refs.child.$el.style.width = "100%";
      this.$refs.child.$el.style.height = "100%";
      this.$refs.child.chart.reflow();
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
            color:"#e91e63",
            negativeColor:"#63e91e",
            data: this.backtester.backtest_result.pnl.data.y,
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
              this.backtester.backtest_result.pnl.data.y
            ),
            max: Math.max.apply(
              null,
              this.backtester.backtest_result.pnl.data.y
            )
          }
        ],
        chart: {
          type:"column",
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
