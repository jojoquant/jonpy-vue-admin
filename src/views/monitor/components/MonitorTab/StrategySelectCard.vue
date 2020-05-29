<template>
  <v-card>
    <v-row align-item-center>
      <v-col cols="5">
        <v-select
          v-model="value"
          :items="items"
          dense
          label="Chips"
          chips
          deletable-chips
          multiple
          outlined
        ></v-select>
      </v-col>
      <v-col cols="1">
        <v-btn color="success" @click="add_strategy">添加策略</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
// import vuex_monitor_types from "../../../../store/modules/monitor_types";


export default {
  data() {
    return {
      items: ["fodddddo", "bardddddd", "fizddddz", "buddddddzz"],
      value: []
    };
  },
  methods: {
    add_strategy(){
      
    }
  }
};
</script>
