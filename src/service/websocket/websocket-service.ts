interface WebSocketConfig {
  url: string
  heartbeatInterval?: number // 心跳间隔时间（毫秒），默认 30000 毫秒
  maxReconnectAttempts?: number // 最大重连次数，默认 5 次
  reconnectInterval?: number // 重连间隔时间（毫秒），默认 5000 毫秒
}

interface webSockectInterface {
  socket: WebSocket | null //websocket实例对象
  url: string
  buffer: Uint8Array
  config: WebSocketConfig
  reconnectAttempts: number //当前的重连次数
  heartbeatTimer: ReturnType<typeof setTimeout> | null
  callbacks: { [key: string]: ((data: any) => void)[] }
}

class webSockectSerivce implements webSockectInterface {
  socket!: WebSocket | null
  url: string = ''
  buffer: Uint8Array = new Uint8Array()
  callbacks!: { [key: string]: ((data: any) => void)[] }
  config: WebSocketConfig
  reconnectAttempts: number = 0
  heartbeatTimer: number | null = null

  //构造函数
  constructor(config: WebSocketConfig) {
    this.config = {
      heartbeatInterval: 30000,
      maxReconnectAttempts: 5,
      reconnectInterval: 5000,
      ...config
    }
    this.initWebSocket()
  }

  private initWebSocket() {
    try {
      this.url = this.config.url
      this.socket = new WebSocket(this.url) //实例化webSocket对象
      this.socket.onopen = this.onOpen.bind(this)
      this.socket.onmessage = this.onMessage.bind(this)
      this.socket.onerror = this.onError.bind(this)
      this.socket.onclose = this.onClose.bind(this)
    } catch (error: any) {
      console.error('WebSocket 初始化失败:', error)
    }
  }

  public on(event: string, callback: (data: any) => void) {
    if (!this.callbacks[event]) {
      this.callbacks[event] = []
    }
    this.callbacks[event].push(callback)
  }

  private emit(event: string, data?: any) {
    if (this.callbacks[event]) {
      this.callbacks[event].forEach((callback) => callback(data))
    }
  }

  //发送信息
  public send(data: any) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      try {
        const jsonData = JSON.stringify(data)
        const message = this.createMessage(jsonData)
        this.socket.send(message)
      } catch (error) {
        console.error('发送消息失败:', error)
      }
    } else {
      console.error('WebSocket 连接未打开，无法发送消息')
    }
  }

  //创建符合要求的字符串，设置消息头+消息报文
  private createMessage(data: string): Uint8Array {
    //将传入的字符串数据编码为 Uint8Array 类型的字节数组 [1,2,3]
    const dataBuffer = new TextEncoder().encode(data)
    //创建一个包含数据长度信息的 Uint32Array 数组[3]
    const lengthBuffer = new Uint32Array([dataBuffer.length])
    // 第三步：创建一个新的 Uint8Array 数组，用于存储最终的消息
    // 其长度为数据长度信息的字节长度加上数据本身的字节长度
    const message = new Uint8Array(lengthBuffer.byteLength + dataBuffer.length)
    //将长度信息复制到新数组的起始位置
    message.set(new Uint8Array(lengthBuffer.buffer), 0)
    //将实际的数据复制到新数组中，从长度信息之后的位置开始
    message.set(dataBuffer, lengthBuffer.byteLength)
    return message
  }

  // 接受数据
  private async onMessage(event: MessageEvent) {
    try {
      const newData = new Uint8Array(await event.data.arrayBuffer())
      this.buffer = this.concatBuffers(this.buffer, newData)
      this.processMessages()
    } catch (error) {
      console.error('解析消息失败:', error)
    }
  }

  //拼接数据
  private concatBuffers(buffer1: Uint8Array, buffer2: Uint8Array): Uint8Array {
    //创建一个新的 Uint8Array 实例，其长度为 buffer1 和 buffer2 的长度之和
    const tmp = new Uint8Array(buffer1.length + buffer2.length)
    //将 buffer1 中的元素复制到 tmp 数组的起始位置
    tmp.set(buffer1, 0)
    //将 buffer2 中的元素复制到 tmp 数组中，从 buffer1 结束的位置开始
    tmp.set(buffer2, buffer1.length)
    return tmp
  }

  //处理解析数据
  private processMessages() {
    //循环检查 buffer 中是否至少有 4 个字节的数据  一个字解析4位
    while (this.buffer.length >= 4) {
      //创建一个 DataView 对象，用于读取消息长度信息
      const lengthView = new DataView(this.buffer.buffer, this.buffer.byteOffset, 4)
      const messageLength = lengthView.getUint32(0, true)
      //检查 buffer 中是否包含完整的消息（长度信息 + 消息内容）
      if (this.buffer.length >= 4 + messageLength) {
        //提取消息内容（不包含长度信息）
        const messageData = this.buffer.slice(4, 4 + messageLength)
        // // 步骤 6: 将提取的消息内容从字节数组解码为字符串
        const message = new TextDecoder().decode(messageData)
        try {
          const jsonMessage = JSON.parse(message)
          this.emit('message', jsonMessage)
        } catch (error) {
          console.error('解析消息失败:', error)
        }
        //新 buffer，移除已处理的消息（长度信息 + 消息内容）
        this.buffer = this.buffer.slice(4 + messageLength)
      } else {
        break
      }
    }
  }

  //连接
  private onOpen() {
    console.log('WebSocket 连接已打开')
    this.reconnectAttempts = 0
    this.startHeartbeat()
    this.emit('open')
  }
  //错误
  private onError(error: Event) {
    console.error('WebSocket 发生错误:', error)
    this.emit('error', error)
  }

  //关闭
  private onClose(event: CloseEvent) {
    console.log('WebSocket 连接已关闭:', event.code, event.reason)
    this.emit('close', event)
    this.stopHeartbeat()
    // 可以添加重连逻辑
    this.reconnect()
  }

  //心跳函数多
  private startHeartbeat() {
    this.heartbeatTimer = setTimeout(() => {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.send({ type: 'heartbeat' })
        this.startHeartbeat()
      }
    }, this.config.heartbeatInterval)
  }

  //跳转心跳释放内存
  private stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearTimeout(this.heartbeatTimer)
      this.heartbeatTimer = null
    }
  }

  //重连
  private reconnect() {
    if (this.reconnectAttempts < this.config.maxReconnectAttempts!) {
      setTimeout(() => {
        console.log('尝试重新连接 WebSocket...')
        this.reconnectAttempts++
        this.initWebSocket()
      }, this.config.reconnectInterval)
    } else {
      console.log('达到最大重连次数，停止重连')
    }
  }
}

export default webSockectSerivce
