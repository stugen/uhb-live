import express, { Router } from 'express'
import { restDeleteChatMessages, restGetChatMessages } from './api/chat-handler'
import { restDeleteStream, restGetAllStreams, restGetStream, restPostStream, restPutStream } from './api/stream-handler'
import { verifyTokenAuthenticity } from './common-requests'

export const getApiRouter = (): Router => {
  const router = express.Router()

  router.get('/chat/{uuid}', restGetChatMessages)
  router.delete('/chat/{uuid}', verifyTokenAuthenticity, restDeleteChatMessages)

  router.get('/collection')
  router.post('/collection')
  router.get('/collection/{uuid}')
  router.put('/collection/{uuid}')
  router.delete('/collection/{uuid}')

  router.get('/stream', verifyTokenAuthenticity, restGetAllStreams)
  router.post('/stream', verifyTokenAuthenticity, restPostStream)
  router.get('/stream/{uuid}', restGetStream)
  router.put('/stream/{uuid}', verifyTokenAuthenticity, restPutStream)
  router.delete('/stream/{uuid}', verifyTokenAuthenticity, restDeleteStream)

  return router
}
