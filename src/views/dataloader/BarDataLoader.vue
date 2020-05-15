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
          v-model="export_to_selected"
          :items="dataloader.export_to"
          label="载入数据到"
          :placeholder="export_to_default"
          dense
          outlined
        ></v-select>
      </v-col>
      <v-col class="text-center">
        <v-btn color="success" class="mr-0" @click="submitSelected"
          >开始加载</v-btn
        >
      </v-col>
    </v-row>
    <v-progress-linear
      v-model="dataloader.progress"
      color="blue-grey"
      height="25"
      reactive
    >
      <template v-slot="{ value }">
        <strong>{{ Math.ceil(value) }}%</strong>
      </template>
    </v-progress-linear>
  </v-card>
</template>

<script>
import vuex_dataloader_types from "../../store/modules/dataloader_types";
import { mapState, mapActions } from "vuex";

export default {
  name: "BarDataLoader",
  components: {
    ContractInfoCard: () => import("./components/ContractInfoCard"),
    TableInfoCard: () => import("./components/TableInfoCard"),
    FormatInfoCard: () => import("./components/FormatInfoCard")
  },

  created() {
    this.export_to_default = this.dataloader.export_to[0];
  },

  data: () => ({
    export_to_selected: [],
    export_to_default: null
  }),

  computed: {
    ...mapState({
      dataloader: state => state.dataloader
    })
  },

  methods: {
    ...mapActions(vuex_dataloader_types.name, [vuex_dataloader_types.send]),
    submitSelected() {
      // console.log(this.export_to_selected);
      let redata = {
        load_data: this.dataloader.submit_data
      };
      console.log(redata);

      if (this.export_to_selected == false) {
        console.log("this.export_to_selected is true", this.export_to_default);
        redata.load_data.export_to_selected = this.export_to_default;
      } else {
        console.log("this.export_to_selected is else", this.export_to_selected);
        redata.load_data.export_to_selected = this.export_to_selected;
      }

      if (this.validSubmitData(redata.load_data)) {
        console.log(redata);
        this.send(JSON.stringify(redata));
      } else {
        alert("数据不完整!!");
      }
    },
    validSubmitData(redata) {
      for (let key in redata) {
        if (redata[key] == false) {
          return false;
        }
      }

      return true;
    }
  }
};
</script>
