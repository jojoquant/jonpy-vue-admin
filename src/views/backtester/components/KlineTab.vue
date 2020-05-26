<template>
  <v-row>
    <v-col cols="12">
      <KlineCard />
    </v-col>
    <v-col cols="12">
      <DailyTableCard />
    </v-col>
  </v-row>
</template>

<script>
export default {
  components: {
    KlineCard: () => import("./KlineTab/KlineCard"),
    DailyTableCard: () => import("./KlineTab/DailyTableCard")
  },
};
</script>
