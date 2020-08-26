import path from 'path'
import express, { Router } from 'express'
import { sourceRoot } from '../helper/paths'
import { send404, serveVueApp, verifyTokenAuthenticity } from './common-requests'
import { doAddStream, doDeleteStream, doUpdateStream, sendAllStreams, sendStreamData } from './stream-requests'
import { doClearChat, sendRecentChatMessages } from './chat-requests'
import { redirectLogin, requestToken, verifyResponse } from './auth-requests'

export const getRouter = (): Router => {
  const router = express.Router()

  router.use('/build', express.static(path.join(sourceRoot, 'ui'), {
    maxAge: 30 * 86400 * 1000
  }))

  router.get('/data/streams', verifyTokenAuthenticity, sendAllStreams)
  router.post('/data/streams', verifyTokenAuthenticity, doAddStream)
  router.get('/data/stream/:streamname', sendStreamData)
  router.delete('/data/stream/:uuid', verifyTokenAuthenticity, doDeleteStream)
  router.put('/data/stream/:uuid', verifyTokenAuthenticity, doUpdateStream)
  router.get('/data/chat/:streamname', sendRecentChatMessages)
  router.delete('/data/chat/:uuid', verifyTokenAuthenticity, doClearChat)
  router.all('/data', send404)

  router.get('/auth/login', redirectLogin)
  router.get('/auth/callback', requestToken)
  router.get('/auth/verify', verifyResponse)
  router.all('/auth', send404)

  router.get('*', serveVueApp)

  return router
}
