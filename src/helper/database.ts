import 'reflect-metadata'
import { createConnection, Connection, Repository } from 'typeorm'
import { config } from '../config/config-loader'
import { Stream } from '../models/Stream'
import { ChatMessage } from '../models/ChatMessage'
import { StreamSource } from '../models/StreamSource'
import { Collection } from '../models/Collection'

export let streamRepository: Repository<Stream> = null
export let streamSourceRepository: Repository<StreamSource> = null
export let chatMessageRepository: Repository<ChatMessage> = null
export let collectionRepository: Repository<Collection> = null

const connectDatabase = (): Promise<Connection> => {
  const commonConfig = {
    entities: [
      Stream,
      StreamSource,
      ChatMessage,
      Collection
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
    streamSourceRepository = connection.getRepository(StreamSource)
    collectionRepository = connection.getRepository(Collection)
    resolve()
  }).catch((error: Error) => {
    reject(error)
  })
})
