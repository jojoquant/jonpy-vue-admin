<template>
  <v-app-bar :hide-on-scroll="hideOnScroll" app clipped-left>
    <v-app-bar-nav-icon @click.stop="$store.commit('inverseDashboardCoreDrawer')" />
    <v-toolbar-title>Application</v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: "DashboardCoreAppBar",

  data: () => ({
    hideOnScroll:true,
  }),

};
</script>
