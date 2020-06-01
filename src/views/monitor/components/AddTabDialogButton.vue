<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">
        <v-icon>mdi-plus</v-icon>
        新增主机面板
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <v-container>
          <v-text-field v-model="tab_name" label="主机名称"></v-text-field>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import vuex_monitor_types from "../../../store/modules/monitor_types";
import { mapState, mapMutations } from "vuex";

export default {
  data: () => ({
    dialog: false,
    editedIndex: -1,
    tab_name: "main",
    editedItem: {
      ...vuex_monitor_types.default_server
    }
  }),

  computed: {
    ...mapState({ monitor: state => state.monitor })
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    ...mapMutations(vuex_monitor_types.name, [vuex_monitor_types.add_server]),

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      let key = this.tab_name;
      let obj = this.editedItem;

      if (!(key in this.monitor.servers)) {
        this.add_server({ key, obj });
        this.$notify({
          title: "成功",
          message: `新增主机面板 ${key}`,
          type: "success"
        });
      } else {
        this.$notify({
          title: "失败",
          message: `主机面板 ${key} 已存在`,
          type: "error"
        });
      }

      this.close();
    }
  }
};
</script>
