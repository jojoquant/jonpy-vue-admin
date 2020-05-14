class WebSocketWrap {
    constructor(url, onMessageCallback){
        this.url = url
        this.ws = new WebSocket(this.url)
        this.ws_connected = false
        this.onMessageCallback = onMessageCallback
    }

    connect(){
        if(this.ws_connected){
            this.disconnect()
        }
        console.log('websocketjs connect')
        // this.ws = new WebSocket(this.url)
        this.ws.onopen = this.onOpen
        this.ws.onclose = this.onClose
        this.ws.onmessage = this.onMessage
        // this.ws.connect()
    }

    onOpen(){
        console.log("Connection opening ...")
    }

    onMessage(event){
        return this.onMessageCallback(event)
    }

    send(msg){
        if(this.ws_connected){
            this.ws.send(msg)
        }
    }

    disconnect(){
        this.ws.close()
    }

    onClose(){
        console.log("Connection closed.")
        this.ws_connected = false
    }
}

export default WebSocketWrap;