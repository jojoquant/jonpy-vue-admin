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
          <v-text-field
            v-model="editedItem.name"
            label="主机名称"
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
  data: () => ({
    dialog: false,
    editedIndex: -1,
    editedItem: {
      name: "",
      connect_status: false,
      stategy_running_num: 0
    },
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
      vuex_monitor_types.add_server
    ]),

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      this.add_server(this.editedItem)
      this.close();
    }
  }
};
</script>
