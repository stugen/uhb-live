import express, { Router } from 'express'
import { restDeleteChatMessages, restGetChatMessages } from './api/chat-handler'
import { restDeleteStream, restGetAllStreams, restGetStream, restPostStream, restPutStream } from './api/stream-handler'

export const getApiRouter = (): Router => {
  const router = express.Router()

  router.get('/chat/{uuid}', restGetChatMessages)
  router.delete('/chat/{uuid}', restDeleteChatMessages)

  router.get('/collection')
  router.post('/collection')
  router.get('/collection/{uuid}')
  router.put('/collection/{uuid}')
  router.delete('/collection/{uuid}')

  router.get('/stream', restGetAllStreams)
  router.post('/stream', restPostStream)
  router.get('/stream/{uuid}', restGetStream)
  router.put('/stream/{uuid}', restPutStream)
  router.delete('/stream/{uuid}', restDeleteStream)

  return router
}
