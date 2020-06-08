<template>
  <v-data-table
    :headers="headers"
    :items="strategy_parameters"
    item-key="name"
    class="elevation-1"
    dense
  >
  </v-data-table>
</template>

<script>
export default {
  props: {
    strategy_parameters: Array
  },
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
      { text: "Value", value: "value" }
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

  methods: {
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
