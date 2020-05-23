<template>
  <v-app id="dashboard">
    <dashboard-app-bar />
    <dashboard-drawer />
    <v-container fluid fill-height class="d-flex flex-row align-start">
      <router-view></router-view>
      <v-btn
        v-scroll="onScroll"
        v-show="fab"
        fab
        fixed
        bottom
        right
        color="primary"
        @click="toTop"
      >
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
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

  data: () => ({
    fab: false
  }),

  created() {
    this.$vuetify.theme.dark = true;
  },

  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    }
  }
};
</script>
