<template>
  <v-app id='inspire'>
    <dashboard-app-bar />
    <dashboard-drawer />
    <router-link to="/dataloader">dataloader</router-link>
    <router-link to="/backtester">backtester</router-link>
    <router-link to="/test">组件测试</router-link>
    <router-view></router-view>
    <dashboard-footer />
  </v-app>
</template>

<script>
  export default {
    name: 'DashboardIndex',
    components: {
      DashboardAppBar: () => import('./components/AppBar'),
      DashboardDrawer: () => import('./components/Drawer'),
      DashboardFooter: () => import('./components/Footer'),
    },

    data: () => ({

    }),

    created() {
    this.$vuetify.theme.dark = true;
  }
  }
</script>
