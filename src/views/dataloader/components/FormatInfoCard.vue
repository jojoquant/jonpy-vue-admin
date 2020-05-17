<template>
  <v-card>
    <v-card-title class="py-1">
      格式信息
    </v-card-title>
    <v-text-field
      label="时间格式"
      v-model="time_format"
      class="purple-input"
      outlined
      dense
      hide-details
      @change="updateTimeFormat"
    />
  </v-card>
</template>

<script>
import vuex_dataloader_types from "../../../store/modules/dataloader_types";
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState({
      dataloader: state => state.dataloader
    }),
    time_format: {
      // 实现了v-model双向绑定vuex中属性
      get() {
        return this.dataloader.time_format;
      },
      set(val) {
        this.updateTimeFormat(val);
      }
    }
  },

  methods: {
    ...mapMutations(vuex_dataloader_types.name, [
      vuex_dataloader_types.updateTimeFormat
    ])
  }
};
</script>
