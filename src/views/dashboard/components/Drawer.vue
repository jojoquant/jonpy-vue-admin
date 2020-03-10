<template>
  <v-navigation-drawer
    v-model="$store.state.dashboardCoreDrawer"
    :mini-variant="miniVariant"
    :expand-on-hover="expandOnHover"
    app
    clipped
  >
    <v-list>
      <v-list-item link v-for="(item, index) in appObjArray" :key="index">
        <v-list-item-action>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{item.appName}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "DashboardCoreDrawer",

  data: () => {
    return {
      // drawer: true,
      expandOnHover: true,
      miniVariant: true,
      appObjArray: [
        { icon: "mdi-apple", appName: "数据导入" },
        { icon: "mdi-ipod", appName: "回测加载" },
        { icon: "mdi-apple-icloud", appName: "策略监控" },
        { icon: "settings", appName: "设置" }
      ]
    };
  },

};
</script>
