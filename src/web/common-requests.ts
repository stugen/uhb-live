import { NextFunction, Request, Response } from 'express'
import path from 'path'
import jwt from 'jsonwebtoken'
import { sourceRoot } from '../helper/paths'
import { getStreamByName } from '../controller/stream'
import { Stream } from '../models/Stream'
import { ChatMessage } from '../models/ChatMessage'
import { getRecentChatMessages } from '../controller/chat'
import { config } from '../config/config-loader'
import { getCollectionByName } from '../controller/collection'
import { Collection } from '../models/Collection'
const { verify } = jwt

export enum FetchedData {
  STREAM,
  CHATLOG,
  COLLECTION
}

export const serveVueApp = (req: Request, res: Response): void => {
  res.sendFile(path.join(sourceRoot, 'ui', 'index.html'))
}

export const sendControlledData = async (type: FetchedData, req: Request, res: Response): Promise<void> => {
  const slug = req.params.slug
  try {
    let data: Stream | ChatMessage[] | Collection
    switch (type) {
      case FetchedData.STREAM:
        data = await getStreamByName(slug)
        break
      case FetchedData.CHATLOG:
        data = await getRecentChatMessages(slug)
        break
      case FetchedData.COLLECTION:
        data = await getCollectionByName(slug)
    }
    if (!data) {
      res.status(404).send()
      return
    }
    res.json(data)
  } catch (e) {
    console.error(e)
    res.status(500).send()
  }
}

export const send404 = (req: Request, res: Response): void => {
  res.status(404).send()
}

export const verifyTokenAuthenticity = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.headers.authorization) {
    res.status(403).send()
    return
  }
  const token = req.headers.authorization.replace(/^Bearer\s/, '')
  req.token = token
  verify(token, config.get('tokenSecret'), (err, data: { name: string, iat: number }) => {
    if (err) {
      res.status(403).send()
      return
    }
    if ((data.iat + 7200) * 1000 < Date.now()) {
      res.status(403).send()
    }
    req.tokenData = data
  })
  next()
}
