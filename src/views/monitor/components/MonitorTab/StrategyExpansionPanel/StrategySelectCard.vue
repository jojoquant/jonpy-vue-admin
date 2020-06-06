<template>
  <v-card flat>
    <v-row align-item-center>
      <v-col cols="12">
        <v-select
          v-model="value"
          :items="servers[this.tab_name].strategy_select"
          dense
          :label="`${servers[this.tab_name].strategy_select.length}个可选策略`"
          small-chips
          solo
          deletable-chips
          hide-details
          multiple
          outlined
        ></v-select>
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="exchange"
          :items="Object.keys(servers[this.tab_name].exchange_contract_obj)"
          dense
          :label="
            `${
              Object.keys(servers[this.tab_name].exchange_contract_obj).length
            }个可选交易所`
          "
          solo
          hide-details
          outlined
        ></v-select>
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="contract_select"
          :items="contracts"
          dense
          :label="`${contracts.length}个可选合约`"
          solo
          hide-details
          outlined
        ></v-select>
      </v-col>
      <v-col>
        <v-btn color="blue" class="ma-2" @click="add_strategy"
          >添加所选策略</v-btn
        >
        <v-btn color="amber darken-4" class="ma-2" @click="add_strategy"
          >初始化策略</v-btn
        >
        <v-btn color="success" class="ma-2" @click="add_strategy"
          >启动全部策略</v-btn
        >
        <v-btn color="error" class="ma-2" @click="add_strategy"
          >停止全部策略</v-btn
        >
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import vuex_monitor_types from "../../../../../store/modules/monitor_types";
import { mapState, mapMutations } from "vuex";

export default {
  props: {
    tab_name: String,
    engine_name: String
  },
  data() {
    return {
      value: [],
      exchange: "",
      contract_select:""
    };
  },

  computed: {
    ...mapState({
      servers: state => state.monitor.servers,
      contracts(state) {
        if (this.exchange) {
          return state.monitor.servers[this.tab_name].exchange_contract_obj[
            this.exchange
          ].map(item => {
            return `${item.symbol}_${item.name}`;
          });
        } else {
          return [];
        }
      }
    })
  },
  methods: {
    ...mapMutations(vuex_monitor_types.name, [
      vuex_monitor_types.add_strategy_to_engine
    ]),
    add_strategy() {
      // console.log(this.value)
      // debugger
      let payload = {
        strategy: this.value,
        tab_name: this.tab_name,
        engine_name: this.engine_name,
        notify_callback: this.$notify
      };
      this.add_strategy_to_engine(payload);
      this.value = [];
    }
  }
};
</script>
