<template>
  <v-card>
    <v-card-title primary-title>
      [ {{ this.engine_name }} ] 合约策略组
    </v-card-title>
    <div>
      <StrategySelectCard :tab_name="tab_name" :engine_name="engine_name" />
      <br />
      <v-expansion-panels v-model="panel" :disabled="disabled" multiple>
        <v-expansion-panel
          v-for="(value, index) in engines[this.engine_name].strategy_arr"
          :key="index"
        >
          <v-expansion-panel-header>
            [{{ value.strategy_name }}] ({{value.strategy_class}})
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-btn
                small
                rounded
                class="mx-4"
                color="amber darken-4"
                @click="init_strategy(engine_name, index)"
              >
                <v-icon left>mdi-reload</v-icon>
                初始化策略
              </v-btn>
              <v-btn
                small
                rounded
                class="mx-4"
                color="success"
                @click="start_strategy(engine_name, index)"
              >
                <v-icon left>mdi-play</v-icon>
                启动策略
              </v-btn>
              <v-btn
                small
                rounded
                class="mx-4"
                color="deep-purple darken-2"
                @click="stop_strategy(engine_name, index)"
              >
                <v-icon left>mdi-stop</v-icon>
                停止策略
              </v-btn>
              <v-btn
                small
                rounded
                class="mx-4"
                color="error"
                @click="remove_strategy(engine_name, index)"
              >
                <v-icon left>mdi-trash-can</v-icon>
                删除策略
              </v-btn>
            </v-row>
            <v-row>
              <StrategyCard
                :tab_name="tab_name"
                :engine_name="engine_name"
                :strategy_name="value.strategy_name"
                :strategy_class="value.strategy_class"
                :strategy_variables="value.strategy_variables"
                :strategy_parameters="value.strategy_parameters"
                :strategy_arr_index="index"
              />
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <FabSpeedDial :tab_name="tab_name" :engine_name="engine_name" />
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {
    StrategyCard: () => import("./StrategyExpansionPanel/StrategyCard"),
    StrategySelectCard: () =>
      import("./StrategyExpansionPanel/StrategySelectCard"),
    FabSpeedDial: () => import("./StrategyExpansionPanel/FabSpeedDial")
  },

  props: {
    engine_name: String,
    tab_name: String
  },

  data: () => ({
    panel: [],
    disabled: false,
    readonly: false
  }),

  computed: {
    ...mapState({
      engines(state) {
        // 为了能使用props中的tab_name, 这里一改以往的箭头函数写法
        // console.log("in engines computed, state.monitor.servers[this.tab_name].engines is")
        // console.log(state.monitor.servers[this.tab_name].engines)
        return state.monitor.servers[this.tab_name].engines;
      }
    })
  },

  methods: {
    init_strategy(engine_name, index) {
      console.log("init_strategy, index: ", engine_name, index);
    },
    start_strategy(engine_name, index) {
      console.log("start_strategy, index: ", engine_name, index);
    },
    stop_strategy(engine_name, index) {
      console.log("stop_strategy, index: ", engine_name, index);
    },
    remove_strategy(engine_name, index) {
      console.log("remove_strategy, index: ", engine_name, index);
    }
  }
};
</script>
