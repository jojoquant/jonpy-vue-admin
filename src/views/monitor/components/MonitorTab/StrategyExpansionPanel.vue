<template>
  <v-card>
    <v-card-title primary-title> {{ this.engine_name }}号引擎 </v-card-title>
    <div>
      <!-- <div class="d-flex"> -->
      <!-- <v-checkbox v-model="disabled" label="Disabled"></v-checkbox> -->
      <!-- <v-spacer></v-spacer> -->
      <StrategySelectCard :tab_name="tab_name" />
      <!-- </div> -->

      <v-expansion-panels v-model="panel" :disabled="disabled" multiple>
        <v-expansion-panel>
          <v-expansion-panel-header>Panel 1</v-expansion-panel-header>
          <v-expansion-panel-content>
            Some content
            <StrategyCard />
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>Panel 2</v-expansion-panel-header>
          <v-expansion-panel-content>
            Some content
            <StrategyCard />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <FabSpeedDial :tab_name="tab_name" :engine_name="engine_name" />
  </v-card>
</template>

<script>
export default {
  components: {
    StrategyCard: () => import("./StrategyExpansionPanel/StrategyCard"),
    StrategySelectCard: () =>
      import("./StrategyExpansionPanel/StrategySelectCard"),
    FabSpeedDial: () => import("./StrategyExpansionPanel/FabSpeedDial")
  },

  props: {
    engine_name: String,
    tab_name: String,
  },

  data: () => ({
    panel: [0, 1],
    disabled: false,
    readonly: false
  }),

  methods: {}
};
</script>
