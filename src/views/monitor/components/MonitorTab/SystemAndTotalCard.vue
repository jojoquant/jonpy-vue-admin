<template>
  <v-card
    ><v-text-field
      color="primary"
      label="label"
      placeholder="placeholder"
      v-model="value"
      loading
    >
      <v-progress-linear
        slot="progress"
        value="progress"
        height="7"
        color="primary"
      ></v-progress-linear>
    </v-text-field>
  </v-card>
</template>

<script>
export default {
  props: {
    tab_name: String
  },
  data() {
    return {
      value:""
    };
  },

  computed: {},

  methods: {}
};
</script>
