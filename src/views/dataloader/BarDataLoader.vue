<template>
  <v-card dense max-width="400" color="indigo">
    <v-card-title primary-title>
      Bar数据导入
    </v-card-title>
    <v-row>
      <v-col>
        <ContractInfoCard />
        <FormatInfoCard />
        <TableInfoCard />
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-right">
        <v-select
          :items="dataloader.export_to"
          value="to_db"
          label="载入数据到"
          dense
          outlined
        ></v-select>
      </v-col>
      <v-col class="text-center">
        <v-btn color="success" class="mr-0">开始加载</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "BarDataLoader",
  components: {
    ContractInfoCard: () => import("./components/ContractInfoCard"),
    TableInfoCard: () => import("./components/TableInfoCard"),
    FormatInfoCard: () => import("./components/FormatInfoCard")
  },

  data: () => ({}),

  computed: {
    ...mapState({
      dataloader: state => state.dataloader
    })
  }
};
</script>
