<template>
  <v-data-table
    :headers="headers"
    :items="strategy_variables"
    item-key="name"
    class="elevation-1"
    dense
  >
    <template v-slot:top>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedItem.name"
                    readonly
                    label="Variable"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model.number="editedItem.value"
                    :type="valueType(editedItem.value)"
                    label="Value"
                  ></v-text-field>
                </v-col>
              </v-row>
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

    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
    </template>

    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>

    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">More info about {{ item.name }}</td>
    </template>
  </v-data-table>
</template>

<script>
import vuex_monitor_types from "../../../../../../store/modules/monitor_types";
import { mapMutations, mapActions } from "vuex";

export default {
  props: {
    engine_name: String,
    tab_name: String,
    strategy_name: String,
    strategy_class: String,
    strategy_variables: Array,
    strategy_arr_index: Number
  },
  data: () => ({
    dialog: false,
    expanded: [],
    singleExpand: false,
    strategy_run: false,
    headers: [
      {
        text: "变量名称",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Value", value: "value" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      name: "",
      value: 0
    },
    defaultItem: {
      name: "",
      value: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    ...mapMutations(vuex_monitor_types.name, [
      vuex_monitor_types.update_engines_strategy_variables
    ]),
    ...mapActions(vuex_monitor_types.name, [vuex_monitor_types.send]),
    editItem(item) {
      this.editedIndex = this.strategy_variables.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        let payload = {
          engine_name: this.engine_name,
          tab_name: this.tab_name,
          strategyArrIndex: this.strategy_arr_index,
          editedIndex: this.editedIndex,
          editedItem: this.editedItem
        };
        // 更新vuex中数据
        this.update_engines_strategy_variables(payload);
        // 同步更新后端
        // console.log("check strategy_variables", this.strategy_variables);
        let msg = JSON.stringify({
          edit_strategy: {
            strategy_name: this.strategy_name,
            strategy_variables: this.strategy_variables
          }
        });
        this.send({ tab_name: this.tab_name, msg });
      } else {
        this.strategy_variables.push(this.editedItem);
      }
      this.close();
    },

    valueType(val) {
      // 这里为了说明 input 类型, 特意单独独立出函数调用
      // vuetify type set 为 "number" 并不生效, 
      // 需要用 vuejs 的 v-model.number 强制绑定数据为number类型
      // console.log("valueType: ", val, typeof val);
      return typeof val;
    },

    run_stop() {
      this.strategy_run = !this.strategy_run;
    }
  }
};
</script>
