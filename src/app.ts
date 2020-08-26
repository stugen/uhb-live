import express from 'express'
import compression from 'compression'
import helmet from 'helmet'
import http from 'http'
import WebSocket from 'ws'
import { config } from './config/config-loader'
import { initDatabase } from './helper/database'
import { getRouter } from './web/router'
import { initializeWs } from './web/ws-handler'

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({
  path: '/chat',
  server
})

app.set('trust proxy', config.get('reverseProxy'))

// set common safety-practises
app.use(helmet({
  frameguard: {
    action: 'deny'
  },
  hsts: false,
  referrerPolicy: {
    policy: 'no-referrer'
  },
  contentSecurityPolicy: false
}))

app.use(compression())
app.use(express.json())
app.use(getRouter())
initializeWs(wss)

initDatabase.then(() => {
  server.listen(config.get('port'), config.get('bind'), () => {
    console.log('Server started')
  })
}).catch((error: Error) => {
  console.error(error)
  process.exit(1)
})
