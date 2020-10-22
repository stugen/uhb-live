import jwt from 'jsonwebtoken'
import { DeleteResult } from 'typeorm'
import { chatMessageRepository } from '../helper/database'
import { ChatMessage } from '../models/ChatMessage'
import { config } from '../config/config-loader'
const { verify } = jwt

/**
 * Queries and returns the most recent 100 chat messages for a stream/video room.
 * @param stream {String} The stream for which the messages should be queried.
 */
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

/**
 * Adds a new chat message to a chat room bound to a stream/video.
 * @param sender {String} The display name of the sender of the message.
 * @param content {String} The text content of the message.
 * @param stream {String} The uuid of the stream this message belongs to.
 * @param token {String} The JWT auth token of the authenticated user (if so). Otherwise blank.
 */
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
  msg.content = content // TODO Filter out links with non-whitelisted domains as well as curses and insults.
  msg.sender = sender
  msg.stream = stream
  msg.senderMail = undefined // Note that this is subject to change in future versions.
  msg.senderVerified = verified
  msg.timestamp = Math.floor(Date.now() / 1000)
  return chatMessageRepository.save(msg)
}

/**
 * Deletes all chat messages that belong to a stream/video permanently.
 * @param stream {String} The uuid of the stream for which all messages should be deleted.
 */
export const clearChat = (stream: string): Promise<DeleteResult> => {
  return chatMessageRepository.delete({
    stream
  })
}
