<template>
  <v-card>
    <router-view></router-view>
    <v-card-title>
      {{name}}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      dense
      :headers="backtester.backtest_result.daily.headers"
      :items="backtester.backtest_result.daily.content"
      :search="search"
    >
      <template v-slot:item.trading_pnl="{ item }">
        <v-chip :color="getColor(item.trading_pnl)" dark>
          {{ item.trading_pnl }}
        </v-chip>
      </template>
      <template v-slot:item.holding_pnl="{ item }">
        <v-chip :color="getColor(item.holding_pnl)" dark>
          {{ item.holding_pnl }}
        </v-chip>
      </template>
      <template v-slot:item.total_pnl="{ item }">
        <v-chip :color="getColor(item.total_pnl)" dark>
          {{ item.total_pnl }}
        </v-chip>
      </template>
      <template v-slot:item.net_pnl="{ item }">
        <v-chip :color="getColor(item.net_pnl)" dark>
          {{ item.net_pnl }}
        </v-chip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      name:"每日盈亏",
      search: ""
    };
  },

  computed: {
    ...mapState({
      backtester: state => state.backtester
    })
  },
  methods: {
    getColor(val) {
      if (val > 0) return "red";
      else if (val < 0) return "green";
      else return "gray";
    },
  }
};
</script>
