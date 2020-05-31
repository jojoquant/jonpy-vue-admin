<template>
  <v-card>
      <v-card-title primary-title>
          {{this.engine_name}}引擎
      </v-card-title>
    <div>
      <div class="d-flex">
        <v-checkbox v-model="disabled" label="Disabled"></v-checkbox>
        <v-spacer></v-spacer>
        <StrategySelectCard />
      </div>

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

        <v-expansion-panel>
          <v-expansion-panel-header>Panel 3</v-expansion-panel-header>
          <v-expansion-panel-content>
            Some content
            <StrategyCard />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <v-fab-transition>
      <v-btn color="pink" dark absolute top right fab>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-card>
</template>

<script>
export default {
  components: {
    StrategyCard: () => import("./StrategyExpansionPanel/StrategyCard"),
    StrategySelectCard: () =>
      import("./StrategyExpansionPanel/StrategySelectCard")
  },

  props:{
      engine_name:String,
  },

  data: () => ({
    panel: [0, 1],
    disabled: false,
    readonly: false
  })
};
</script>
