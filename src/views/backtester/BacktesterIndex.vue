<template>
  <v-tabs>
    <v-tab>回测主面板</v-tab>
    <v-tab>交易记录表</v-tab>
    <v-tab>KLine图表</v-tab>

    <v-tab-item>
      <MainTab />
    </v-tab-item>
    <v-tab-item>
      <RecordTab />
    </v-tab-item>
    <v-tab-item>
      <MainTab />
    </v-tab-item>
  </v-tabs>
</template>

<script>
import vuex_backtester_types from "../../store/modules/backtester_types";
import setting from "../../setting";
import { mapActions } from "vuex";

export default {
  name: "BacktesterIndex",
  components: {
    MainTab: () => import("./components/MainTab"),
    RecordTab:() => import("./components/RecordTab")
  },

  data: () => ({
    tag: "我是Backtester模块"
  }),

  beforeMount() {
    this.__init__(
      `ws://${setting.back_end_ip}:${setting.back_end_port}/${vuex_backtester_types.name}`
    );
  },

  methods: {
    ...mapActions(vuex_backtester_types.name, [vuex_backtester_types.__init__])
  }
};
</script>
