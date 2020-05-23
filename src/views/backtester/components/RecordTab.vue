<template>
  <v-row>
    <v-col>
      <TradeTableCard />
    </v-col>
    <v-col>
      <OrderTableCard />
    </v-col>
  </v-row>
</template>

<script>
export default {
  components: {
    OrderTableCard: () => import("./RecordTab/OrderTableCard"),
    TradeTableCard: () => import("./RecordTab/TradeTableCard")
  },
};
</script>
