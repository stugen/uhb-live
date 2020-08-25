import { Stream } from '../models/Stream'
import { streamRepository } from '../helper/database'
import { DeleteResult } from 'typeorm'
import { clearChat } from './chat'

export const getStreamByName = (shortName: string): Promise<Stream> => {
  return streamRepository.findOne({
    where: {
      shortName
    }
  })
}

export const getAllStreams = (): Promise<Stream[]> => {
  return streamRepository.find({
    order: {
      startTime: 'DESC',
      shortName: 'ASC'
    }
  })
}

export const deleteStream = async (uuid: string): Promise<DeleteResult> => {
  try {
    await clearChat(uuid)
  } catch (e) {
    console.error(e)
  }
  return streamRepository.delete({
    uuid
  })
}

export const addNewStream = (name: string, shortName: string, src: string, chat: boolean, startTime: number): Promise<Stream> => {
  const stream = new Stream()
  stream.name = name
  stream.shortName = shortName
  stream.source = src
  stream.chat = chat
  stream.startTime = startTime
  return streamRepository.save(stream)
}

export const updateStream = async (uuid: string, name: string, shortName: string, src: string, chat: boolean, startTime: number): Promise<Stream> => {
  const stream = await streamRepository.findOne({
    uuid
  })
  stream.name = name
  stream.shortName = shortName
  stream.source = src
  stream.chat = chat
  stream.startTime = startTime
  return streamRepository.save(stream)
}
