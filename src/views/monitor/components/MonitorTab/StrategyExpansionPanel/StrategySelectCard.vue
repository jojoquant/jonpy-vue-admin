<template>
  <v-card>
    <v-row align-item-center>
      <v-col cols="12">
        <v-select
          v-model="value"
          :items="servers[this.tab_name].strategy_select"
          dense
          label="可选策略"
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
import { mapState } from "vuex";

export default {
  props: {
    tab_name: String
  },
  data() {
    return {
      value:[]
    };
  },

  computed: {
    ...mapState({
      servers: state => state.monitor.servers
    })
  },
  methods: {
    add_strategy() {}
  }
};
</script>
