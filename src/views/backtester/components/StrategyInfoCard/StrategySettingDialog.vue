<template>
  <v-dialog v-model="dialog" max-width="400">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
    </template>
    <v-card dense>
      <v-card-title>
        <span class="headline">策略参数配置</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-form @submit="formSubmit">
                <v-text-field
                  :label="key"
                  :value="value"
                  required
                  v-for="(value, key, index) in backtester.strategy_setting"
                  :key="index"
                ></v-text-field>
              </v-form>
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
import vuex_backtester_types from "../../../../store/modules/backtester_types";
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({
    dialog: false
  }),

  computed: {
    ...mapState({
      backtester: state => state.backtester
    })
  },

  methods: {
    ...mapActions(vuex_backtester_types.name, [vuex_backtester_types.send]),
    run_backtest(e) {
      console.log(e);
    },
    formSubmit(e){
        console.log(e)
    }
  }
};
</script>
