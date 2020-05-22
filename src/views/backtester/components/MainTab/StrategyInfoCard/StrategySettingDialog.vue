<template>
  <v-dialog v-model="dialog" max-width="400">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">开始回测</v-btn>
    </template>
    <v-card dense>
      <v-card-title>
        <span class="headline">策略参数配置</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                :label="key"
                :value="value"
                required
                v-for="(value, key, index) in backtester.strategy_setting"
                :key="index"
                @change="updateSettingValue(value, $event, key)"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="run_backtest">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import vuex_backtester_types from "../../../../../store/modules/backtester_types";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  created() {
    this.setting = this.backtester.strategy_setting;
  },

  data: () => ({
    dialog: false,
    setting: {}
  }),

  computed: {
    ...mapState({
      backtester: state => state.backtester
    })
  },

  methods: {
    ...mapActions(vuex_backtester_types.name, [vuex_backtester_types.send]),
    ...mapMutations(vuex_backtester_types.name, [
      vuex_backtester_types.update_dialog_strategy_setting
    ]),

    run_backtest() {
      this.send(
        JSON.stringify({
          run_backtest: {
            submit_data: this.backtester.submit_data,
            strategy_setting: this.backtester.strategy_setting
          }
        })
      );
      this.dialog = false
    },

    updateSettingValue(old_value, new_value, key) {
      // 这个函数相当精妙! 保留原有值的同时还能传额外值, 默认值$event占位
      console.log(old_value, new_value, key);

      // 这里对传入的值做类型判断, 并对new_value进行相应的类型转换
      // 因为new_value入参为string, 在vuetify中无法改变
      // 注意!!! 目前只做字符串和数字的类型转换
      let value_type = typeof old_value;
      if (value_type === "number") {
        new_value = Number(new_value);
      }

      let obj = {};
      obj[key] = new_value;
      this.update_dialog_strategy_setting(obj);
    }
  }
};
</script>
