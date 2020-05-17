<template>
  <v-app id="dashboard">
    <dashboard-app-bar />
    <dashboard-drawer />
    <v-container grid-list-xs >
      <router-view></router-view>
    </v-container>
    <dashboard-footer />
  </v-app>
</template>

<script>
export default {
  name: "DashboardIndex",
  components: {
    DashboardAppBar: () => import("./components/AppBar"),
    DashboardDrawer: () => import("./components/Drawer"),
    DashboardFooter: () => import("./components/Footer")
  },

  data: () => ({}),

  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>
