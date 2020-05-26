<template>
  <v-menu
    v-model="menu2"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="date"
        :label="label.value"
        prepend-icon="event"
        readonly
        dense
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      @input="menu2 = false"
      @change="dateChanged"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import vuex_backtester_types from "../../../../../store/modules/backtester_types";
import { mapState, mapMutations } from "vuex";

export default {
  props: {
    label: {
      type: Object
    }
  },

  data: () => ({
    // date: new Date().toISOString().substr(0, 10),
    menu2: false
  }),

  computed: {
    ...mapState({
      backtester: state => state.backtester
    }),
    date: {
      get: function() {
        if (this.label.value === "开始日期") {
          return this.backtester.submit_data.start_datetime;
        } else if (this.label.value === "结束日期") {
          return this.backtester.submit_data.end_datetime;
        }
        let today = new Date().toISOString().substr(0, 10);
        return today;
      },
      set: function(val){
        this.dateChanged(val)
      }
    }
  },

  methods: {
    ...mapMutations(vuex_backtester_types.name, [
      vuex_backtester_types.update_start_datetime,
      vuex_backtester_types.update_end_datetime
    ]),
    dateChanged(val) {
      // 通过props判断该调用的vuex mutation 函数
      // console.log(this.label)
      // console.log(val)
      if (this.label.value === "开始日期") {
        this.update_start_datetime(val);
      } else if (this.label.value === "结束日期") {
        this.update_end_datetime(val);
      }
    }
  }
};
</script>
