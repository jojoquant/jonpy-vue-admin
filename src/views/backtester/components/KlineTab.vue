<template>
  <v-row>
    <v-col cols="12">
      <KlineCard />
    </v-col>
    <v-col cols="12">
      <TradeTableCard />
    </v-col>
  </v-row>
</template>

<script>
export default {
  components: {
    KlineCard: () => import("./KlineTab/KlineCard"),
    TradeTableCard: () => import("./RecordTab/TradeTableCard")
  },
};
</script>
