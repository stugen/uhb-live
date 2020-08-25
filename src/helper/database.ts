import 'reflect-metadata'
import typeorm, { Connection, Repository } from 'typeorm'
import { config } from '../config/config-loader'
import { Stream } from '../models/Stream'
import { ChatMessage } from '../models/ChatMessage'

const { createConnection } = typeorm

export let streamRepository: Repository<Stream> = null
export let chatMessageRepository: Repository<ChatMessage> = null

const connectDatabase = (): Promise<Connection> => {
  const commonConfig = {
    entities: [
      Stream,
      ChatMessage
    ],
    synchronize: true
  }
  if (config.get('dbType') === 'sqlite') {
    return createConnection({
      ...commonConfig,
      type: 'sqlite',
      database: config.get('dbUrl').replace(/^sqlite:/, '')
    })
  } else if (config.get('dbType') === 'mariadb') {
    return createConnection({
      ...commonConfig,
      type: 'mariadb',
      url: config.get('dbUrl')
    })
  }
}

export const initDatabase = new Promise<void>((resolve, reject) => {
  connectDatabase().then(connection => {
    streamRepository = connection.getRepository(Stream)
    chatMessageRepository = connection.getRepository(ChatMessage)
    resolve()
  }).catch((error: Error) => {
    reject(error)
  })
})
