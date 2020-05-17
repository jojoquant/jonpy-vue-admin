<template>
  <!-- <form dense> -->
  <v-card>
    <v-card-title class="py-1" primary-title>
      合约信息
    </v-card-title>
    <v-select
      outlined
      dense
      class="pa-1"
      hide-details
      :items="contracts.exchanges"
      label="交易所"
      required
      @change="sendExchanges"
    ></v-select>

    <v-select
      dense
      multiple
      outlined
      clearable
      hide-details
      small-chips
      class="pa-1"
      :items="contracts.symbols"
      label="合约代码"
      @change="changeSymbols"
      required
    ></v-select>

    <v-select
      dense
      multiple
      outlined
      clearable
      small-chips
      hide-details
      class="pa-1"
      :items="contracts.periods"
      label="数据周期"
      @change="changePeriods"
      required
    ></v-select>

    <v-text-field
      v-model="contracts_type"
      outlined
      dense
      hide-details
      class="pa-1"
      label="合约类型(L8主连/L9指数/2006)"
      required
      @change="updateContractType"
    ></v-text-field>
  </v-card>

  <!-- </form> -->
</template>

<script>
import vuex_dataloader_types from "../../../store/modules/dataloader_types";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "ContractInfoCard",
  components: {},
  data: () => ({}),

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
      vuex_dataloader_types.changePeriods,
    ]),
    sendExchanges(val) {
      this.send(JSON.stringify({ exchanges: val }));
      this.changeExchanges(val)
    },
  }
};
</script>
