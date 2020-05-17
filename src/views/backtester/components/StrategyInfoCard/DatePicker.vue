<template>
  <v-menu
    v-model="menu2"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="date"
        label="开始日期"
        prepend-icon="event"
        readonly
        dense
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu2: false
  })
};
</script>
