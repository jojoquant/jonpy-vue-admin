<template>
  <!-- <v-container fluid> -->
    <v-row>
      <v-col>
        <OrderTableCard />
      </v-col>
      <v-col>
        <TradeTableCard />
      </v-col>
    </v-row>
  <!-- </v-container> -->
</template>

<script>
export default {
  components: {
    OrderTableCard: () => import("./RecordTab/OrderTableCard"),
    TradeTableCard: () => import("./RecordTab/TradeTableCard")
  },
  data() {}
};
</script>
