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
  
  data() {
    return {
      my_chart: ''
    }
  },

  methods: {
    drawLine() {
      let myChart = echarts.init(document.getElementById(this.id));
      this.my_chart = myChart
      myChart.setOption(this.option);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    updateOption(option){
      // 注意这里, 需要从父组件重新传入option, 
      // 开始传入的option中的属性没有和vuex同步绑定
      this.my_chart.setOption(option)
    }
  }

};
</script>
