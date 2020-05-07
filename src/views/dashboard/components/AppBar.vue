<template>
  <v-app-bar :hide-on-scroll="hideOnScroll" app clipped-left>
    <v-app-bar-nav-icon @click.stop="InverseDrawerStatus" />
    <v-toolbar-title>Jonpy Web Application</v-toolbar-title>
  </v-app-bar>
</template>

<script>
import { mapActions } from "vuex";
import vuex_dashboard_types from "../../../store/modules/dashboard_types";

export default {
  name: "DashboardAppBar",

  data: () => ({
    hideOnScroll: true
  }),

  methods: {
    ...mapActions(vuex_dashboard_types.name, [vuex_dashboard_types.InverseDrawerStatus])
  }
};
</script>
