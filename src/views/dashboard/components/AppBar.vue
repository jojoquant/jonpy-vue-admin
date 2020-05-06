<template>
  <v-app-bar :hide-on-scroll="hideOnScroll" app clipped-left>
    <v-app-bar-nav-icon @click.stop="InverseDrawerStatus" />
    <v-toolbar-title>Jonpy Web Application</v-toolbar-title>
  </v-app-bar>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "DashboardAppBar",

  data: () => ({
    hideOnScroll:true,
  }),

  methods:{
    ...mapActions('dashboard', ['InverseDrawerStatus'])
  },
};
</script>
