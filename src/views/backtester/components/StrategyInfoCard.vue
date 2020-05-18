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
      @change="sendExchanges"
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
      @change="changeSymbols"
      required
    ></v-select>

    <v-text-field
      v-model="backtester.symbol_name"
      dense
      class="pa-1"
      hide-details
      readonly
      label="合约名称"
    ></v-text-field>

    <v-select
      dense
      outlined
      class="pa-1"
      :items="backtester.period_array"
      label="K线周期"
      @change="changePeriods"
      required
    ></v-select>

    <DatePicker />
    <DatePicker />

    <v-text-field
      v-model="backtester.data_nums"
      dense
      class="pa-1"
      readonly
      label="DB内数据总量"
    ></v-text-field>

    <v-text-field
      v-model="item.value"
      outlined
      dense
      hide-details
      class="pa-1"
      :label="item.label"
      required
      @change="updateContractType"
      v-for="(item, index) in bt_setting"
      :key="index"
    ></v-text-field>

    <v-select
      outlined
      dense
      hide-details
      class="pa-1"
      :items="backtester.inverse_mode"
      :value="backtester.inverse_mode[0]"
      label="合约模式(数字货币用反向)"
      required
      @change="sendExchanges"
    ></v-select>

    <v-select
      outlined
      dense
      hide-details
      class="pa-1"
      :items="backtester.backtest_mode"
      :value="backtester.backtest_mode[0]"
      label="回测模式"
      required
      @change="sendExchanges"
    ></v-select>

    <v-row>
      <v-col>
        <v-btn color="success">开始回测</v-btn>
      </v-col>
      <v-col>
        <v-btn color="success">text</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import vuex_dataloader_types from "../../../store/modules/dataloader_types";
import { mapState, mapActions, mapMutations } from "vuex";
import DatePicker from "./StrategyInfoCard/DatePicker";

export default {
  name: "StrategyInfoCard",
  components: {
    DatePicker
  },

  created(){
    this.bt_setting = [
      { label: "手续费率", value: this.backtester.submit_data.rate },
      { label: "交易滑点", value: this.backtester.submit_data.slippage},
      { label: "合约乘数", value: this.backtester.submit_data.size},
      { label: "价格跳动", value: this.backtester.submit_data.pricetick},
      { label: "回测资金", value: this.backtester.submit_data.capital}
    ]
  },

  data: () => ({

  }),

  computed: {
    ...mapState({
      backtester: state => state.backtester
    }),
    // contracts_type: {
    //   get() {
    //     return this.contracts.type;
    //   },
    //   set(val) {
    //     this.updateContractType(val);
    //   }
    // }
  },

  methods: {
    ...mapActions(vuex_dataloader_types.name, [vuex_dataloader_types.send]),
    ...mapMutations(vuex_dataloader_types.name, [
      vuex_dataloader_types.updateContractType,
      vuex_dataloader_types.changeExchanges,
      vuex_dataloader_types.changeSymbols,
      vuex_dataloader_types.changePeriods
    ]),
    sendExchanges(val) {
      this.send(JSON.stringify({ exchanges: val }));
      this.changeExchanges(val);
    }
  }
};
</script>
