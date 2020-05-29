<template>
  <v-container fluid>
    <v-tabs v-model="tab" background-color="red lighten-2" dark>
      <v-tab v-for="n in length" :key="n">
        <v-badge color="deep-purple accent-4" icon="mdi-vuetify">
          未连接 {{ n }}
        </v-badge>
      </v-tab>
      <v-tab-item v-for="n in length" :key="n">
        <v-card-text class="text-center">
          <v-btn text @click="length--">Remove Tab</v-btn>
          <v-divider class="mx-4" vertical></v-divider>
          <v-btn text @click="length++">Add Tab</v-btn>
        </v-card-text>

        <MonitorTab />
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
export default {
  name: "MonitorIndex",
  components: {
    MonitorTab: () => import("./components/MonitorTab")
  },

  data: () => ({
    length: 3,
    tab: null
  }),

  watch: {
    length(val) {
      this.tab = val - 1;
    }
  }
};
</script>
