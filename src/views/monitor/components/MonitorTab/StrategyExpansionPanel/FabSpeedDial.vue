<template>
  <v-speed-dial
    v-model="fab"
    :top="top"
    :bottom="bottom"
    :right="right"
    :left="left"
    :direction="direction"
    :open-on-hover="hover"
    :transition="transition"
    absolute
  >
    <template v-slot:activator>
      <v-btn v-model="fab" color="indigo" dark fab>
        <v-icon v-if="fab">mdi-close</v-icon>
        <v-icon v-else>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-btn fab dark small color="blue" @click="addEngine">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-btn fab dark small color="teal" @click="editEngine">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-btn fab dark small color="red" @click="removeEngine">
      <v-icon>mdi-delete</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
import vuex_monitor_types from "../../../../../store/modules/monitor_types";
import { mapMutations } from "vuex";

export default {
  props: {
    engine_name: String,
    tab_name: String,
    engine_index: Number
  },
  data: () => ({
    direction: "left",
    fab: false,
    fling: false,
    hover: true,
    tabs: null,
    top: true,
    right: true,
    bottom: false,
    left: false,
    transition: "slide-x-reverse-transition"
  }),
  methods: {
    ...mapMutations(vuex_monitor_types.name, [
      vuex_monitor_types.add_engine,
      vuex_monitor_types.edit_engine,
      vuex_monitor_types.remove_engine
    ]),
    addEngine() {
      let payload = {
        tab_name: this.tab_name,
      };
      this.add_engine(payload);
    },
    editEngine() {
        // TODO
    //   let payload = {
    //     tab_name: this.tab_name,
    //     engine_index: this.engine_index
    //   };
    //   this.edit_engine(payload);
    },
    removeEngine() {
      let payload = {
        tab_name: this.tab_name,
        engine_index: this.engine_index,
        notify_callback: this.$notify
      };
      this.remove_engine(payload);
    }
  }
};
</script>
