<template>
  <v-card dense max-width="400" color="indigo">
    <v-card-title primary-title>
      Tick数据导入
    </v-card-title>
    <v-row>
      <v-col>
        <v-card-title class="py-1" primary-title>
          合约信息
        </v-card-title>
        <ContractInfoCard />
        <FormatInfoCard />

        <v-card-title class="py-1">
          表头信息
        </v-card-title>
        <TableInfoCard />
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-right">
        <v-select
          :items="load_methods"
          v-model="load_methods[0]"
          label="载入数据到"
        ></v-select>
      </v-col>
      <v-col class="text-left">
        <v-btn color="success" class="mr-0">载入数据</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "TickDataLoader",
  components: {
    ContractInfoCard: () => import("./components/ContractInfoCard"),
    TableInfoCard: () => import("./components/TableInfoCard"),
    FormatInfoCard: () => import("./components/FormatInfoCard")
  },

  data: () => ({
    tag: "我是Dataloader模块",
    exchanges: ["DCE", "SHFE"],
    symbols: ["RB", "A"],
    periods: [
      "MINUTE",
      "MINUTE_5",
      "MINUTE_15",
      "MINUTE_30",
      "HOUR",
      "DAILY",
      "WEEKLY"
    ],
    load_methods:['to_db', 'to_csv'],
    value:'',
  })
};
</script>
