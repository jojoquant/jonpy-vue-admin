<template>
  <div :id="id" style="width: 100%;height:100%;"></div>
</template>

<script>
import echarts from "echarts";

export default {
  mounted() {
    this.drawLine();
  },
  props: ["id", "option"],
  methods: {
    drawLine() {
      let myChart = echarts.init(document.getElementById(this.id));
      myChart.setOption(this.option);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    }
  }
};
</script>
