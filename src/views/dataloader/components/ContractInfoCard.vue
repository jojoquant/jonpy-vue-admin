<template>
  <form dense>
    <v-select
      v-model="exchanges"
      outlined
      dense
      class="pa-1"
      :items="contracts.exchanges"
      label="交易所"
      required
      @change="changeExchanges"
    ></v-select>

    <v-select
      v-model="symbols"
      dense
      multiple
      outlined
      clearable
      small-chips
      class="pa-1"
      :items="contracts.symbols"
      label="代码"
      required
    ></v-select>

    <v-select
      v-model="periods"
      dense
      multiple
      outlined
      clearable
      small-chips
      class="pa-1"
      :items="contracts.periods"
      label="周期"
      required
    ></v-select>

    <!-- <v-text-field
      v-model="email"
      outlined
      dense
      class="pa-1"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field> -->
    <div>dddd</div>
  </form>
</template>

<script>
import vuex_dataloader_types from "../../../store/modules/dataloader_types";
import { mapState, mapActions } from "vuex";

export default {
  name: "ContractInfoCard",
  components: {},
  data: () => ({
    tag: "我是Dataloader模块",
    exchanges: "",
    symbols:"",
    periods:'',
    load_methods: ["to_csv", "to_db"]
  }),

  methods: {
    ...mapActions(vuex_dataloader_types.name, [vuex_dataloader_types.send]),
    changeExchanges(){
      // console.log("refreshExchanges ex:", this.exchanges)
      // console.log(e)
      this.send(JSON.stringify({"exchanges":this.exchanges}))
    },

    period_change(e){
      console.log(e)
    },
    selectErrors(e){
      console.log('select errors')
      console.log(e)
    }
  },
  computed: {
    ...mapState({
      contracts:state=> state.dataloader.contracts
    })
  },
};
</script>
