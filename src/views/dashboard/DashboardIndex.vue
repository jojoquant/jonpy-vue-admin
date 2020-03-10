<template>
  <v-app id='inspire'>
    <dashboard-core-app-bar />

    <dashboard-core-drawer />

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
