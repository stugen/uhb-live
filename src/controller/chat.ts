import jsonwebtoken from 'jsonwebtoken'
import { DeleteResult } from 'typeorm'
import { chatMessageRepository } from '../helper/database'
import { ChatMessage } from '../models/ChatMessage'
import { config } from '../config/config-loader'

const { verify } = jsonwebtoken

export const getRecentChatMessages = (stream: string): Promise<ChatMessage[]> => {
  return chatMessageRepository.find({
    where: {
      stream
    },
    order: {
      timestamp: 'DESC'
    },
    take: 100
  })
}

export const addChatMessage = (sender: string, content: string, stream: string, token: string): Promise<ChatMessage> => {
  let verified = false
  if (token !== '') {
    try {
      const decoded = verify(token, config.get('tokenSecret')) as {name: string}
      if (decoded.name === sender) {
        verified = true
      }
    } catch (e) {
      console.error('Token decoding failed')
    }
  }
  const msg = new ChatMessage()
  msg.content = content
  msg.sender = sender
  msg.stream = stream
  msg.senderMail = undefined
  msg.senderVerified = verified
  msg.timestamp = Math.floor(Date.now() / 1000)
  return chatMessageRepository.save(msg)
}

export const clearChat = (stream: string): Promise<DeleteResult> => {
  return chatMessageRepository.delete({
    stream
  })
}
