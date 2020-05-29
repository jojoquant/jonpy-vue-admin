<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
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
                    v-model="editedItem.value"
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
export default {
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
    desserts: [],
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
    },
    strategy_status_icon() {
      if (this.strategy_run) {
        return "mdi-play";
      } else {
        return "mdi-stop";
      }
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          name: "Frozen Yogurt",
          value: 159
        },
        {
          name: "Ice cream sandwich",
          value: 237
        },
        {
          name: "Eclair",
          value: 262
        },
        {
          name: "Cupcake",
          value: 305
        },
        {
          name: "Gingerbread",
          value: 356
        },
        {
          name: "Jelly bean",
          value: 375
        },
        {
          name: "Lollipop",
          value: 392
        },
        {
          name: "Honeycomb",
          value: 408
        },
        {
          name: "Donut",
          value: 452
        },
        {
          name: "KitKat",
          value: 518
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
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
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },

    run_stop(item) {
      console.log(item);
      console.log(this.desserts.indexOf(item));

      this.strategy_run = !this.strategy_run;
    }
  }
};
</script>
