<template>
  <v-card>
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
          multiple
          outlined
        ></v-select>
        <v-btn color="success" @click="add_strategy">添加策略</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="add_strategy">启动策略</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import vuex_monitor_types from "../../../../../store/modules/monitor_types";
import { mapState,mapMutations } from "vuex";


export default {
  props: {
    tab_name: String,
    engine_name:String,
  },
  data() {
    return {
      value:[],
    };
  },

  computed: {
    ...mapState({
      servers: state => state.monitor.servers
    })
  },
  methods: {
    ...mapMutations(vuex_monitor_types.name, [
      vuex_monitor_types.add_strategy_to_engine,
    ]),
    add_strategy() {
      // console.log(this.value)
      // debugger
      let payload = {
        strategy: this.value,
        tab_name: this.tab_name,
        engine_name: this.engine_name,
        notify_callback: this.$notify,
      };
      this.add_strategy_to_engine(payload)
      this.value = []
    }
  }
};
</script>
