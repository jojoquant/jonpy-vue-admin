<template>
  <v-card dense raised color="blue-grey">
    <v-select
      outlined
      dense
      hide-details
      class="pa-1"
      :items="strategy"
      label="交易策略"
      required
      @change="sendExchanges"
    ></v-select>
    <v-select
      outlined
      dense
      hide-details
      class="pa-1"
      :items="strategy"
      label="交易所代码"
      required
      @change="sendExchanges"
    ></v-select>

    <v-select
      dense
      multiple
      outlined
      hide-details
      clearable
      small-chips
      class="pa-1"
      :items="contracts.symbols"
      label="合约代码"
      @change="changeSymbols"
      required
    ></v-select>
    <v-text-field
      v-model="contracts_type"
      dense
      class="pa-1"
      hide-details
      readonly
      label="合约名称"
    ></v-text-field>
    <v-select
      dense
      multiple
      outlined
      clearable
      small-chips
      class="pa-1"
      :items="contracts.periods"
      label="K线周期"
      @change="changePeriods"
      required
    ></v-select>

    <DatePicker />
    <DatePicker />

    <v-text-field
      v-model="contracts_type"
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
      v-for="(item, index) in bt_setting" :key="index"
    ></v-text-field>

    <v-select
      outlined
      dense
      hide-details
      class="pa-1"
      :items="contract_mode"
      :value="contract_mode[0]"
      label="合约模式(数字货币用反向)"
      required
      @change="sendExchanges"
    ></v-select>

    <v-select
      outlined
      dense
      hide-details
      class="pa-1"
      :items="backtest_mode"
      :value="backtest_mode[0]"
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
  data: () => ({
    strategy: ["bollstrategy", "MACD", "RSI"],
    bt_setting: [
      { label: "手续费率", value: 0.0002 },
      { label: "交易滑点", value: 0.0 },
      { label: "合约乘数", value: 10.0 },
      { label: "价格跳动", value: 1.0 },
      { label: "回测资金", value: 1000000.0 }
    ],
    contract_mode:["正向", "反向"],
    backtest_mode:["Thread回测", "Debug回测"]
  }),

  computed: {
    ...mapState({
      contracts: state => state.dataloader.contracts
    }),
    contracts_type: {
      get() {
        return this.contracts.type;
      },
      set(val) {
        this.updateContractType(val);
      }
    }
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
