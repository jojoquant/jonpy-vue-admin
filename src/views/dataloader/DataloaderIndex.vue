<template>
  <v-container fluid>
    <BarDataLoader />
    <div>
      {{rb_stomp.on_message_call_back_frame.body}}
    </div>
    <!-- <v-btn color="success" @click="rb_stomp.connect()">text</v-btn> -->
    <v-btn color="success" @click="connect">text</v-btn>
  </v-container>
</template>

<script>
import RabbitmqStomp from '../../network/websocket'

export default {
  name: "DataloaderIndex",
  components: {
    BarDataLoader: () => import("./BarDataLoader")
  },

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
    rb_stomp : new RabbitmqStomp(
      "/exchange/topic_logs/#"
    )
  }),

  methods: {
    connect(){
      console.log('vue connect')
      this.rb_stomp.connect()
    }
  },
};
</script>
