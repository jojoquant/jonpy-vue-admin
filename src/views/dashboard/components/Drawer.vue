<template>
  <v-navigation-drawer
    v-model="drawerStatus.drawer"
    :mini-variant="miniVariant"
    :expand-on-hover="expandOnHover"
    app
    clipped
  >
    <v-list>
      <v-list-item link v-for="(item, index) in appObjArray" :key="index">
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ item.appName }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DashboardDrawer",

  data: () => {
    return {
      // drawer: true,
      expandOnHover: false,
      miniVariant: false,
      appObjArray: [
        { icon: "mdi-apple", appName: "数据导入" },
        { icon: "mdi-ipod", appName: "回测加载" },
        { icon: "mdi-apple-icloud", appName: "策略监控" },
        { icon: "settings", appName: "设置" }
      ]
    };
  },

  computed: {
    ...mapState({
      // 这里用 state.dashboard 而不是 state.dashboard, 防止没有设置set属性[warning]
      drawerStatus: state => state.dashboard
    })
  }

};
</script>
