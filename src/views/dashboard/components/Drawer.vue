<template>
  <v-navigation-drawer
    v-model="dashboard.drawer"
    :mini-variant="miniVariant"
    :expand-on-hover="expandOnHover"
    app
    clipped
  >
    <v-list>
      <v-list-item
        link
        v-for="(item, index) in dashboard.drawerItemsArray"
        :key="index"
        router
        :to="item.route"
      >
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
      miniVariant: false
    };
  },

  computed: {
    ...mapState({
      // 这里用 state.dashboard 而不是 state.dashboard, 防止没有设置set属性[warning]
      dashboard: state => state.dashboard
    })
  }
};
</script>
