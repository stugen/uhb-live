import { Request, Response } from 'express'
import { FetchedData, sendControlledData } from '../common-requests'
import { addNewStream, deleteStream, getAllStreams, updateStream } from '../../controller/stream'
import { Stream } from '../../models/Stream'
import { verifyAttributes } from '../../helper/Verification'

const TYPED_STREAM_ATTRIBUTES = [['uuid', 'string'], ['name', 'string'], ['shortName', 'string'],
  ['description', 'string'], ['chat', 'boolean'], ['startTime', 'number']]
const UNTYPED_STREAM_ATTRIBUTES = ['sources']

export const restGetStream = (req: Request, res: Response): Promise<void> => {
  return sendControlledData(FetchedData.STREAM, req, res)
}

export const restGetAllStreams = async (req: Request, res: Response): Promise<void> => {
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

export const restDeleteStream = async (req: Request, res: Response): Promise<void> => {
  const uuid = req.params.uuid
  try {
    await deleteStream(uuid)
    res.status(204).send()
  } catch (e) {
    res.status(500).send()
  }
}

export const restPutStream = async (req: Request, res: Response): Promise<void> => {
  const data = req.body as Stream
  if (!verifyAttributes(data, TYPED_STREAM_ATTRIBUTES, UNTYPED_STREAM_ATTRIBUTES)) {
    res.status(400).send()
    return
  }
  const uuid = req.params.uuid
  try {
    const updated = await updateStream(
      uuid,
      data.name,
      data.shortName,
      data.sources,
      data.description,
      data.chat,
      data.startTime
    )
    res.json(updated)
  } catch (e) {
    console.error(e)
    res.status(500).send()
  }
}

export const restPostStream = async (req: Request, res: Response): Promise<void> => {
  const data = req.body as Stream
  if (!verifyAttributes(data)) {
    res.status(400).send()
    return
  }
  try {
    const newStream = await addNewStream(
      data.name,
      data.shortName,
      data.sources,
      data.description,
      data.chat,
      data.startTime
    )
    res.json(newStream)
  } catch (e) {
    console.error(e)
    res.status(500).send()
  }
}
