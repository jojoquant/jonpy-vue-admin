<template>
  <div :id="id" style="width: 100%;height:100%;"></div>
</template>

<script>
import echarts from "echarts";

export default {
  mounted() {
    this.drawLine();
  },
  props: ["id"],
  methods: {
    drawLine() {
      console.log(this.id);
      let myChart = echarts.init(document.getElementById(this.id));

      let option = {
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
            type: "line",
            smooth: true
          }
        ],
        backgroundColor: "#607d8b"
      };

      myChart.setOption(option);

      window.addEventListener("resize", () => {
        myChart.resize();
      });
    }
  }
};
</script>
