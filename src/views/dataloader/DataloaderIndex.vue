<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <BarDataLoader />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import vuex_dataloader_types from "../../store/modules/dataloader_types";
import { mapActions } from "vuex";

export default {
  name: "DataloaderIndex",
  components: {
    BarDataLoader: () => import("./BarDataLoader"),
  },

  beforeMount() {
    this.__init__("ws://192.168.0.104:8888/dataloader");
  },

  data: () => ({}),

  methods: {
    ...mapActions(vuex_dataloader_types.name, [vuex_dataloader_types.__init__])
  }
};
</script>
