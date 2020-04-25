<template>
  <form dense>
    <v-select
      v-model="select"
      outlined
      dense
      class="pa-1"
      :items="exchanges"
      :error-messages="selectErrors"
      label="交易所"
      required
      @change="$v.select.$touch()"
      @blur="$v.select.$touch()"
    ></v-select>

    <v-select
      v-model="select"
      dense
      multiple
      outlined
      clearable
      small-chips
      class="pa-1"
      :items="symbols"
      :error-messages="selectErrors"
      label="代码"
      required
      @change="$v.select.$touch()"
      @blur="$v.select.$touch()"
    ></v-select>

    <v-select
      v-model="select"
      dense
      multiple
      outlined
      clearable
      small-chips
      class="pa-1"
      :items="periods"
      :error-messages="selectErrors"
      label="周期"
      required
      @change="$v.select.$touch()"
      @blur="$v.select.$touch()"
    ></v-select>

    <v-text-field
      v-model="email"
      outlined
      dense
      class="pa-1"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
  </form>
</template>

<script>
export default {
  name: "ContractInfoCard",
  components: {},

  data: () => ({
    tag: "我是Dataloader模块",
    exchanges: ["DCE", "SHFE"],
    symbols: ["RB", "A"],
    periods: [
      "MINUTE",
      "MINUTE_5",
      "MINUTE_15",
      "MINUTE_30",
      "HOUR",
      "DAILY",
      "WEEKLY"
    ],
    email: '',
    load_methods: ["to_csv", "to_db"]
  })
};
</script>
