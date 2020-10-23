import express, { Router } from 'express'
import { restDeleteChatMessages, restGetChatMessages } from './api/chat-handler'
import { restDeleteStream, restGetAllStreams, restGetStream, restPostStream, restPutStream } from './api/stream-handler'
import { verifyTokenAuthenticity } from './common-requests'
import {
  restDeleteCollection,
  restGetAllCollections,
  restGetCollection,
  restPostCollection,
  restPutCollection
} from './api/collection-handler'

export const getApiRouter = (): Router => {
  const router = express.Router()

  router.get('/chat/:slug', restGetChatMessages)
  router.delete('/chat/:uuid', verifyTokenAuthenticity, restDeleteChatMessages)

  const collectionSubRouter = express.Router()
  const streamSubRouter = express.Router()

  collectionSubRouter.get('/:slug', restGetCollection)
  collectionSubRouter.put('/:uuid', verifyTokenAuthenticity, restPutCollection)
  collectionSubRouter.delete('/:uuid', verifyTokenAuthenticity, restDeleteCollection)
  collectionSubRouter.get('/', verifyTokenAuthenticity, restGetAllCollections)
  collectionSubRouter.post('/', verifyTokenAuthenticity, restPostCollection)

  streamSubRouter.get('/:slug', restGetStream)
  streamSubRouter.put('/:uuid', verifyTokenAuthenticity, restPutStream)
  streamSubRouter.delete('/:uuid', verifyTokenAuthenticity, restDeleteStream)
  streamSubRouter.get('/', verifyTokenAuthenticity, restGetAllStreams)
  streamSubRouter.post('/', verifyTokenAuthenticity, restPostStream)

  router.use('/collection', collectionSubRouter)
  router.use('/stream', streamSubRouter)

  return router
}
