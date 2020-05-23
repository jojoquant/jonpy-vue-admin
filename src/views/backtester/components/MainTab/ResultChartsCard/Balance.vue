<template>
  <v-card indigo class="mx-auto" height="180">
    <highcharts :options="chartOptions" ref="balanceChart" style="width:0; height:0"></highcharts>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      name: "balance",
      chartOptions: {
        xAxis: [
          {
            type: "category",
            categories: [
              "一月",
              "二月",
              "三月",
              "四月",
              "五月",
              "六月",
              "七月",
              "八月",
              "九月",
              "十月",
              "十一月",
              "十二月"
            ],
            index: 0,
            isX: true
          }
        ],
        series: [
          {
            name: "东京",
            data: [
              7,
              6.9,
              9.5,
              14.5,
              18.2,
              21.5,
              25.2,
              26.5,
              23.3,
              18.3,
              13.9,
              9.6
            ],
            _colorIndex: 0,
            _symbolIndex: 0
          },
          {
            name: "纽约",
            data: [
              -0.2,
              0.8,
              5.7,
              11.3,
              17,
              22,
              24.8,
              24.1,
              20.1,
              14.1,
              8.6,
              2.5
            ],
            _colorIndex: 1,
            _symbolIndex: 1
          },
          {
            name: "柏林",
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17, 18.6, 17.9, 14.3, 9, 3.9, 1],
            _colorIndex: 2,
            _symbolIndex: 2
          },
          {
            name: "伦敦",
            data: [
              3.9,
              4.2,
              5.7,
              8.5,
              11.9,
              15.2,
              17,
              16.6,
              14.2,
              10.3,
              6.6,
              4.8
            ],
            _colorIndex: 3,
            _symbolIndex: 3
          }
        ],
        yAxis: [
          {
            title: {
              text: "温度 (°C)"
            },
            index: 0
          }
        ],
        chart: {
          style: {
            fontFamily: '"微软雅黑", Arial, Helvetica, sans-serif',
            color: "#333",
            fontSize: "12px",
            fontWeight: "normal",
            fontStyle: "normal"
          }
        },
        title: {
          text: "不同城市的月平均气温",
          x: -20
        },
        subtitle: {
          text: "数据来源: WorldClimate.com",
          x: -20
        },
        tooltip: {
          valueSuffix: "°C"
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle"
        },
        plotOptions: {
          series: {
            animation: false
          }
        }
      }
    };
  },
  methods:{
    resize(){
      console.log('resize')
      this.$refs.balanceChart.$el.style.width='100%'
      this.$refs.balanceChart.$el.style.height='100%'
      this.$refs.balanceChart.chart.reflow()
    }
  },
  mounted(){
    console.log("mounted")
    // this.resize()
    this.$nextTick(()=>{this.resize()})
    
  },
  computed: {
    ...mapState({
      backtester: state => state.backtester
    }),

  //   option() {
  //     return {
  //       xAxis: {
  //         type: "category",
  //         data: this.backtester.backtest_result.balance.data.x
  //       },
  //       yAxis: {
  //         type: "value"
  //       },
  //       series: [
  //         {
  //           data: this.backtester.backtest_result.balance.data.y,
  //           type: "line",
  //           smooth: true
  //         }
  //       ],
  //       backgroundColor: "#607d8b"
  //     };
  //   }
  // },
  // watch: {
  //   option() {
  //     this.$refs.child.updateOption(this.option);
  //   }
  }
};
</script>
