<template>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Field</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in fields" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.value }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: "TableInfoCard",
  components: {},

  data: () => ({
    fields: [
      { name: "日期", value: "Datetime" },
      { name: "开盘价", value: "Open" },
      { name: "最高价", value: "High" },
      { name: "最低价", value: "Low" },
      { name: "收盘价", value: "Close" }
    ]
  })
};
</script>
