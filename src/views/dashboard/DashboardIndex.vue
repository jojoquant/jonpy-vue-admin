<template>
  <v-app id='inspire'>
    <dashboard-core-app-bar />

    <dashboard-core-drawer />
    <router-link to="/dataloader">dataloader</router-link>
    <router-link to="/backtester">backtester</router-link>
    <router-view></router-view>
    <dashboard-core-footer />
  </v-app>
</template>

<script>
  export default {
    name: 'DashboardIndex',
    components: {
      DashboardCoreAppBar: () => import('./components/AppBar'),
      DashboardCoreDrawer: () => import('./components/Drawer'),
      DashboardCoreFooter: () => import('./components/Footer'),
    },

    data: () => ({

    }),

    created() {
    this.$vuetify.theme.dark = true;
  }
  }
</script>
