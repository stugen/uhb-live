import path from 'path'
import express, { Router } from 'express'
import { sourceRoot } from '../helper/paths'
import { send404, serveVueApp } from './common-requests'
import { redirectLogin, requestToken, verifyResponse } from './auth-requests'
import { getApiRouter } from './api-router'

export const getRouter = (): Router => {
  const router = express.Router()

  router.use('/build', express.static(path.join(sourceRoot, 'ui'), {
    maxAge: 30 * 86400 * 1000
  }))

  router.use('/api/v1/', getApiRouter())

  router.get('/auth/login', redirectLogin)
  router.get('/auth/callback', requestToken)
  router.get('/auth/verify', verifyResponse)
  router.all('/auth', send404)

  router.get('*', serveVueApp)

  return router
}
