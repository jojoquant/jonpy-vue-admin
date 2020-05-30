<template>
  <v-container fluid>
    <v-tabs v-model="tab" background-color="blue-grey darken-3">
      <v-tab v-for="item in servers" :key="item.name">
        <v-badge :color="item.connect_status?'green':'red'" :content="item.stategy_running_num">
          {{ item.name }}
        </v-badge>
      </v-tab>

      <v-tab-item v-for="item in servers" :key="item.name">
        <v-card-text class="text-right">
          <v-btn color="red" :value="item.name" @click="removeTab">
            <v-icon>mdi-minus</v-icon>
            删除当前面板
          </v-btn>
          <v-divider class="mx-4" vertical></v-divider>
          <!-- <v-btn @click="addTab">Add Tab</v-btn> -->
          <AddTabDialogButton />
        </v-card-text>

        <MonitorTab />
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import _ from "lodash";

export default {
  name: "MonitorIndex",
  components: {
    MonitorTab: () => import("./components/MonitorTab"),
    AddTabDialogButton: () => import("./components/AddTabDialogButton")
  },

  data: () => ({
    length: 3,
    tab: null,
    servers: [
      { name: "aliyun", connect_status: true , stategy_running_num:10},
      { name: "aliyun2", connect_status: false ,stategy_running_num:0},
      { name: "aliyun3", connect_status: false ,stategy_running_num:0}
    ]
  }),

  methods: {
    removeTab(event) {
      if (this.servers.length == 1) {
        return;
      }
      this.servers = _.remove(this.servers, item => {
        return item.name != event.currentTarget.value;
      });
    },
    addTab() {
      console.log(this.tab);
    }
  },

  watch: {
    servers: {
      handler(newValue, oldValue) {
        console.log("watch servers:", newValue, oldValue);
      },
      deep: true
    }
  }
};
</script>
