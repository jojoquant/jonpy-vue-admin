import Stomp from "stompjs";

const WS_URL = "ws://192.168.0.104:15674/ws";
const HEADERS = {
  login: "guest",
  passCode: "guest"
};

class RabbitmqStomp {
  constructor(topic) {
    this.ws_url = WS_URL;
    this.client = "";
    this.topic = topic;
    this.recv_frame = "recv frame";
    this.on_message_call_back_frame = { body: "sss" };
    this.send_msg = "";
    this.headers = HEADERS;

    // 关闭心跳检测
    // this.client.heartbeat.outgoing = 0;
    // this.client.heartbeat.incoming = 0;
  }

  connect() {
    let ws = new WebSocket(this.ws_url);
    this.client = Stomp.over(ws);
    console.log("connect !!!");
    this.on_message_call_back_frame.body = "connect";

    this.client.connect(
      this.headers,
      frame => {
        this.onConnect(frame);
      },
      frame => {
        this.onFailed(frame);
      }
    );
  }

  onConnect(frame) {
    console.log("Inside connected, frame:", frame);
    this.client.subscribe(
      this.topic,
      frame => {
        this.onMessageCallback(frame);
      },
      frame => {
        this.onFailed(frame);
      }
    );
  }

  onFailed(frame) {
    console.log("Inside Connect error, frame: ", frame);
  }

  onMessageCallback(frame) {
    console.log("onMessageCallback frame body: ", frame.body);
    this.on_message_call_back_frame = frame;
  }
}

export default RabbitmqStomp;
