import WebSocket from 'ws'
import { addChatMessage, getRecentChatMessages } from '../controller/chat'

export enum WsCommand {
  PING,
  ACK,
  ERR,
  ROOM,
  MSG
}

interface IncomingChatMessage {
  sender: string;
  content: string;
  token: string;
}

const clientToRoom = new Map<WebSocket, string>()
const rooms: {[room: string]: WebSocket[]} = {}

const broadcast = (room: string, message: string): void => {
  if (!rooms[room]) {
    rooms[room] = []
  }
  rooms[room].forEach(target => {
    if (target.readyState === WebSocket.OPEN) {
      target.send(message)
    }
  })
}

const setRoom = (socket: WebSocket, room: string): void => {
  if (!room || clientToRoom.get(socket) !== '') {
    socket.send(WsCommand.ERR)
    return
  }
  clientToRoom.set(socket, room)
  if (!rooms[room]) {
    rooms[room] = []
  }
  rooms[room].push(socket)
  socket.send(WsCommand.ACK)
  getRecentChatMessages(room).then(messages => {
    messages = messages.reverse()
    messages.forEach(msg => {
      socket.send(`${WsCommand.MSG}:${JSON.stringify(msg)}`)
    })
  }).catch((error: Error) => {
    console.error(error)
  })
}

const handleChatMessage = (socket: WebSocket, message: string): void => {
  let data: null | IncomingChatMessage = null
  const room = clientToRoom.get(socket)
  try {
    data = JSON.parse(message) as IncomingChatMessage
  } catch (e) {
    socket.send(WsCommand.ERR)
    return
  }
  addChatMessage(data.sender, data.content, room, data.token).then((msg) => {
    broadcast(room, `${WsCommand.MSG}:${JSON.stringify(msg)}`)
  }).catch((error: Error) => {
    console.error(error)
    socket.send(WsCommand.ERR)
  })
}

function onWsMessage (data: string): void {
  const socket = this as unknown as WebSocket
  const message = data.split(/:(.+)/)
  const command = parseInt(message[0])
  switch (command) {
    case WsCommand.PING:
      socket.send(WsCommand.ACK)
      break
    case WsCommand.ROOM:
      setRoom(socket, message[1] ?? '')
      break
    case WsCommand.MSG:
      handleChatMessage(socket, message[1] ?? '')
      break
    default:
      socket.send(WsCommand.ERR)
  }
}

function onWsClose (): void {
  const socket = this as unknown as WebSocket
  const room = clientToRoom.get(socket)
  clientToRoom.delete(socket)
  if (!room || room === '') {
    return
  }
  if (!rooms[room]) {
    rooms[room] = []
  }
  rooms[room] = rooms[room].filter(s => s !== socket)
}

const onWsConnect = (socket: WebSocket): void => {
  clientToRoom.set(socket, '')
  socket.on('message', onWsMessage)
  socket.on('close', onWsClose)
}

export const initializeWs = (wss: WebSocket.Server): void => {
  wss.on('connection', onWsConnect)
}
