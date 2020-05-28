<template>
  <v-container fluid>
    <v-tabs v-model="tab" background-color="red lighten-2" dark>
      <v-tab v-for="n in length" :key="n"> Item {{ n }} </v-tab>
      <v-tab-item v-for="n in length" :key="n">
        <v-card-text class="text-center">
          
          <v-btn text @click="length--">Remove Tab</v-btn>
          <v-divider class="mx-4" vertical></v-divider>
          <v-btn text @click="length++">Add Tab</v-btn>
        </v-card-text>

        <RecordTab />
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>


export default {
  name: "MonitorIndex",
  components: {
    RecordTab: () => import("./components/RecordTab")
  },

  data: () => ({
    length: 15,
    tab: null
  }),



  watch: {
    length(val) {
      this.tab = val - 1;
    }
  }
};
</script>
