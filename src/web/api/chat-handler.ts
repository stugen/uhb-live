import { Request, Response } from 'express'
import { FetchedData, sendControlledData } from '../common-requests'
import { clearChat } from '../../controller/chat'

export const restGetChatMessages = (req: Request, res: Response): Promise<void> => {
  return sendControlledData(FetchedData.CHATLOG, req, res)
}

export const restDeleteChatMessages = async (req: Request, res: Response): Promise<void> => {
  const chat = req.params.uuid
  try {
    await clearChat(chat)
    res.status(204).send()
  } catch (e) {
    res.status(500).send()
  }
}
