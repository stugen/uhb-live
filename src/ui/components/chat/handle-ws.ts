enum WsCommand {
  PING,
  ACK,
  ERR,
  ROOM,
  MSG
}

interface ChatMessage {
  uuid: string;
  content: string;
  sender: string;
  senderMail?: string;
  senderVerified: boolean;
  timestamp: number;
  stream: string;
}

const handleError = (event: Event): void => {
  console.error(event)
}

const send = (socket: WebSocket, data: string | ArrayBuffer): void => {
  if (socket.readyState !== WebSocket.OPEN) {
    return
  }
  socket.send(data)
}

const sendPing = (socket: WebSocket): void => {
  send(socket, `${WsCommand.PING}`)
}

export const setupPingInterval = (socket: WebSocket): number => {
  return window.setInterval(() => sendPing(socket), 10000)
}

export const joinRoom = (socket: WebSocket, room: string): void => {
  send(socket, `${WsCommand.ROOM}:${room}`)
}

export const handleMessage = (socket: WebSocket, data: string): ChatMessage | null => {
  const message = data.split(/:(.+)/)
  const command = parseInt(message[0])
  let msgData: ChatMessage | null = null
  switch (command) {
    case WsCommand.PING:
      send(socket, `${WsCommand.ACK}`)
      break
    case WsCommand.ACK:
    case WsCommand.ERR:
      break
    case WsCommand.MSG:
      try {
        msgData = JSON.parse(message[1] ?? '') as ChatMessage
      } catch (e) {
        send(socket, `${WsCommand.ERR}`)
        return null
      }
      break
    default:
      send(socket, `${WsCommand.ERR}`)
  }
  return msgData
}

export const initializeWs = (): WebSocket => {
  const location = new URL(document.location.href)
  const secure = location.protocol === 'https'
  const host = location.host

  const socket = new WebSocket(`ws${secure ? 's' : ''}://${host}/chat`)
  socket.onerror = handleError
  return socket
}

export const sendMessage = (socket: WebSocket, sender: string, text: string, token: string): void => {
  const data = {
    sender,
    token,
    content: text
  }
  send(socket, `${WsCommand.MSG}:${JSON.stringify(data)}`)
}
