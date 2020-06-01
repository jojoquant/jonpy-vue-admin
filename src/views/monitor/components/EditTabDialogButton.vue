<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn color="teal" dark v-on="on">
        <v-icon>mdi-pencil-outline</v-icon>
        编辑当前标题
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <v-container>
          <v-text-field
            readonly
            :value="tab_name"
            label="当前主机名称"
          ></v-text-field>
          <v-text-field
            v-model="editedItem.name"
            label="重置主机名称"
          ></v-text-field>
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
  props: {
    tab_name: String
  },

  data: () => ({
    dialog: false,
    editedIndex: -1,
    editedItem: {
      name: ""
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
    ...mapMutations(vuex_monitor_types.name, [
      vuex_monitor_types.edit_server_name
    ]),

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedItem.name in this.monitor.servers) {
        this.$notify({
          title: "失败",
          message: `主机面板 ${this.editedItem.name} 已存在`,
          type: "error"
        });
      } else if (this.editedItem.name === "") {
        this.$notify({
          title: "失败",
          message: `主机面板 ${this.editedItem.name} 不能为空`,
          type: "error"
        });
      } else {
        this.edit_server_name({
          old_name: this.tab_name,
          new_name: this.editedItem.name
        });

        this.$notify({
          title: "成功",
          message: `主机面板 ${this.tab_name} 重命名为 ${this.editedItem.name}`,
          type: "success"
        });
      }
      this.close();
    }
  }
};
</script>
