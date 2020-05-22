<template>
  <v-card dense raised color="blue-grey">
    <v-select
      outlined
      dense
      hide-details
      class="pa-1"
      :items="backtester.strategy_array"
      label="交易策略"
      required
      @change="changeStrategy"
    ></v-select>

    <v-select
      outlined
      dense
      hide-details
      class="pa-1"
      :items="backtester.exchange_array"
      label="交易所代码"
      required
      @change="sendExchanges"
    ></v-select>

    <v-select
      dense
      outlined
      hide-details
      class="pa-1"
      :items="backtester.symbol_array"
      label="合约代码"
      @change="sendSymbol"
      required
    ></v-select>

    <v-select
      dense
      outlined
      hide-details
      class="pa-1"
      :items="backtester.period_array"
      label="K线周期"
      @change="sendPeriod"
      required
    ></v-select>

    <v-text-field
      v-model="backtester.symbol_name"
      dense
      class="pa-1"
      readonly
      label="合约名称"
    ></v-text-field>

    <DatePicker
      :label="item"
      v-for="(item, key) in date_picker"
      :key="key + 10"
    />

    <v-text-field
      v-model="backtester.data_nums"
      dense
      class="pa-1"
      readonly
      label="DB内数据总量"
    ></v-text-field>

    <v-text-field
      v-model="backtester.submit_data[item.name]"
      outlined
      dense
      hide-details
      class="pa-1"
      :label="item.label"
      required
      @change="item.func"
      v-for="(item, index) in bt_setting"
      :key="index"
    ></v-text-field>

    <v-select
      outlined
      dense
      hide-details
      class="pa-1"
      :items="backtester.inverse_mode"
      :value="backtester.submit_data.inverse_mode_selected"
      label="合约模式(数字货币用反向)"
      required
      @change="update_inverse_mode_selected"
    ></v-select>

    <v-select
      outlined
      dense
      hide-details
      class="pa-1"
      :items="backtester.backtest_mode"
      :value="backtester.submit_data.backtest_mode_selected"
      label="回测模式"
      required
      @change="update_backtest_mode_selected"
    ></v-select>

    <StrategySettingDialog />
  </v-card>
</template>

<script>
import vuex_backtester_types from "../../../../store/modules/backtester_types";
import { mapState, mapActions, mapMutations } from "vuex";
import DatePicker from "./StrategyInfoCard/DatePicker";
import StrategySettingDialog from "./StrategyInfoCard/StrategySettingDialog";

export default {
  name: "StrategyInfoCard",
  components: {
    DatePicker,
    StrategySettingDialog
  },

  created() {
    this.bt_setting = [
      { label: "手续费率", name: "rate", func: this.updateRate },
      { label: "交易滑点", name: "slippage", func: this.updateSlippage },
      { label: "合约乘数", name: "size", func: this.updateSize },
      { label: "价格跳动", name: "pricetick", func: this.updatePricetick },
      { label: "回测资金", name: "capital", func: this.updateCapital }
    ];
  },

  data: () => ({
    cur_exchange: "",
    cur_symbol: "",
    cur_period: "",
    date_picker: [{ value: "开始日期" }, { value: "结束日期" }]
  }),

  computed: {
    ...mapState({
      backtester: state => state.backtester
    })
  },

  methods: {
    ...mapActions(vuex_backtester_types.name, [vuex_backtester_types.send]),
    ...mapMutations(vuex_backtester_types.name, [
      vuex_backtester_types.updateStrategy,
      vuex_backtester_types.changeExchanges,
      vuex_backtester_types.changeSymbols,
      vuex_backtester_types.changePeriods,
      vuex_backtester_types.updateRate,
      vuex_backtester_types.updateSlippage,
      vuex_backtester_types.updateSize,
      vuex_backtester_types.updatePricetick,
      vuex_backtester_types.updateCapital,
      vuex_backtester_types.update_inverse_mode_selected,
      vuex_backtester_types.update_backtest_mode_selected
    ]),

    changeStrategy(val) {
      this.send(JSON.stringify({ strategy: val }));
      this.updateStrategy(val);
    },

    sendExchanges(val) {
      this.send(JSON.stringify({ exchange: val }));
      this.changeExchanges(val);
      this.cur_exchange = val;
    },

    sendSymbol(val) {
      this.send(
        JSON.stringify({ symbol: { symbol: val, exchange: this.cur_exchange } })
      );
      this.changeSymbols(val);
      this.cur_symbol = val;
    },

    sendPeriod(val) {
      this.send(
        JSON.stringify({
          period: {
            symbol: this.cur_symbol,
            exchange: this.cur_exchange,
            period: val
          }
        })
      );
      this.changePeriods(val);
      this.period = val;
    },

    submit() {
      // let url = this.$router.resolve({path:'/dataloader', name:'record'})
      let url = "/backtester/record";
      window.open(url, "_blank");
    }
  }
};
</script>
