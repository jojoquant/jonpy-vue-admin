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
      :headers="backtester.backtest_result.order.headers"
      :items="backtester.backtest_result.order.content"
      :search="search"
    >
      <template v-slot:item.direction="{ item }">
        <v-chip :color="getColor(item.direction)" dark>
          {{ item.direction }}
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
      name:"委托记录",
      search: ""
    };
  },

  computed: {
    ...mapState({
      backtester: state => state.backtester
    })
  },
  methods: {
    getColor(direction) {
      if (direction == "多") return "red";
      else if (direction == "空") return "green";
      else return "orange";
    },
  }
};
</script>
