<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    item-key="name"
    class="elevation-1"
    dense
  >
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
        text: "参数名称",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Value", value: "value" },
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

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
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
