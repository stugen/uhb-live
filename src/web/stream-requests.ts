import { Request, Response } from 'express'
import { FetchedData, sendControlledData } from './common-requests'
import { addNewStream, deleteStream, getAllStreams, updateStream } from '../controller/stream'
import { Stream } from '../models/Stream'

export const sendStreamData = (req: Request, res: Response): Promise<void> => {
  return sendControlledData(FetchedData.STREAM, req, res)
}

export const sendAllStreams = async (req: Request, res: Response): Promise<void> => {
  try {
    const allStreams = await getAllStreams()
    if (!allStreams) {
      res.status(500).send()
    }
    res.json(allStreams)
  } catch (e) {
    res.status(500).send()
  }
}

export const doDeleteStream = async (req: Request, res: Response): Promise<void> => {
  const uuid = req.params.uuid
  try {
    await deleteStream(uuid)
    res.status(204).send()
  } catch (e) {
    res.status(500).send()
  }
}

const verifyAttributes = (data: Stream): boolean => {
  const attributesStr = ['uuid', 'name', 'shortName', 'source']
  const attributesNum = ['startTime']
  const attributesBool = ['chat']
  for (const str of attributesStr) {
    if (!Object.prototype.hasOwnProperty.call(data, str) || typeof data[str] !== 'string') {
      return false
    }
  }
  for (const num of attributesNum) {
    if (!Object.prototype.hasOwnProperty.call(data, num) || typeof data[num] !== 'number') {
      return false
    }
  }
  for (const bool of attributesBool) {
    if (!Object.prototype.hasOwnProperty.call(data, bool) || typeof data[bool] !== 'boolean') {
      return false
    }
  }
  return true
}

export const doUpdateStream = async (req: Request, res: Response): Promise<void> => {
  const data = req.body as Stream
  if (!verifyAttributes(data)) {
    res.status(400).send()
    return
  }
  const uuid = req.params.uuid
  try {
    const updated = await updateStream(uuid, data.name, data.shortName, data.source, data.chat, data.startTime)
    res.json(updated)
  } catch (e) {
    console.error(e)
    res.status(500).send()
  }
}

export const doAddStream = async (req: Request, res: Response): Promise<void> => {
  const data = req.body as Stream
  if (!verifyAttributes(data)) {
    res.status(400).send()
    return
  }
  try {
    const newStream = await addNewStream(data.name, data.shortName, data.source, data.chat, data.startTime)
    res.json(newStream)
  } catch (e) {
    console.error(e)
    res.status(500).send()
  }
}
