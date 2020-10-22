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

  router.get('/chat/{slug}', restGetChatMessages)
  router.delete('/chat/{uuid}', verifyTokenAuthenticity, restDeleteChatMessages)

  router.get('/collection/{slug}', restGetCollection)
  router.get('/collection', verifyTokenAuthenticity, restGetAllCollections)
  router.post('/collection', verifyTokenAuthenticity, restPostCollection)
  router.put('/collection/{uuid}', verifyTokenAuthenticity, restPutCollection)
  router.delete('/collection/{uuid}', verifyTokenAuthenticity, restDeleteCollection)

  router.get('/stream/{slug}', restGetStream)
  router.get('/stream', verifyTokenAuthenticity, restGetAllStreams)
  router.post('/stream', verifyTokenAuthenticity, restPostStream)
  router.put('/stream/{uuid}', verifyTokenAuthenticity, restPutStream)
  router.delete('/stream/{uuid}', verifyTokenAuthenticity, restDeleteStream)

  return router
}
