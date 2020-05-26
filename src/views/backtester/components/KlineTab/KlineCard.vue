<template>
  <v-card indigo class="mx-auto" height="700">
    <highcharts
      :constructor-type="'stockChart'"
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
      name: "kline",
      groupingUnits: [
        [
          "week", // unit name
          [1] // allowed multiples
        ],
        ["month", [1, 2, 3, 4, 6]]
      ]
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
        rangeSelector: {
          selected: 1,
          inputDateFormat: "%Y-%m-%d"
        },
        title: {
          text: "回测Kline"
        },
        xAxis: {
          dateTimeLabelFormats: {
            millisecond: "%H:%M:%S.%L",
            second: "%H:%M:%S",
            minute: "%H:%M",
            hour: "%H:%M",
            day: "%m-%d",
            week: "%m-%d",
            month: "%y-%m",
            year: "%Y"
          }
        },
        tooltip: {
          split: false,
          shared: true
        },
        yAxis: [
          {
            labels: {
              align: "right",
              x: -3
            },
            title: {
              text: "股价"
            },
            height: "65%",
            resize: {
              enabled: true
            },
            lineWidth: 2
          },
          {
            labels: {
              align: "right",
              x: -3
            },
            title: {
              text: "成交量"
            },
            top: "65%",
            height: "35%",
            offset: 0,
            lineWidth: 2
          }
        ],
        series: [
          {
            type: "candlestick",
            name: "平安银行",
            color: "green",
            lineColor: "green",
            upColor: "red",
            upLineColor: "red",
            tooltip: {},
            // navigatorOptions: {
            //   color: Highcharts.getOptions().colors[0]
            // },
            data: this.backtester.backtest_result.kline.ohlc,
            dataGrouping: {
              units: this.groupingUnits
            },
            id: "sz"
          },
          {
            type: "column",
            data: this.backtester.backtest_result.kline.volume,
            yAxis: 1,
            dataGrouping: {
              units: this.groupingUnits
            }
          }
        ]
      };
    }
  }
};
</script>
