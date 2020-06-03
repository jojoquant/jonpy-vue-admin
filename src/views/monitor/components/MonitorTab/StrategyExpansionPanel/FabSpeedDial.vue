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
      // v-for 对于 object 的deep watch监听, 无法用直接赋值的方式触发
      // 需要用this.$set(obj, key/newKey, newValue) 触发watch 
      // 所以把 全局$set函数 作为 回调函数 传进 vuex mutation 中
      // v-for 数组 没有这个问题
      let payload = {
        tab_name: this.tab_name,
        notify_callback: this.$notify,
        thisSet_callback: this.$set
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
        engine_name: this.engine_name,
        notify_callback: this.$notify,
        thisDelete_callback: this.$delete
      };
      this.remove_engine(payload);
    }
  }
};
</script>
