import { Stream } from '../models/Stream'
import { collectionRepository, streamRepository, streamSourceRepository } from '../helper/database'
import { DeleteResult } from 'typeorm'
import { clearChat } from './chat'
import { StreamSource, StreamSourceInput } from '../models/StreamSource'
import { arrayDiff } from '../helper/ArrayDiff'

/**
 * Get the details of a stream/video.
 * @param shortName {String} The (URL)-slug of the stream.
 */
export const getStreamByName = (shortName: string): Promise<Stream> => {
  return streamRepository.findOne({
    where: {
      shortName
    }
  })
}

/**
 * Get a list of all streams set up in the database.
 */
export const getAllStreams = (): Promise<Stream[]> => {
  return streamRepository.find({
    order: {
      startTime: 'DESC',
      shortName: 'ASC'
    }
  })
}

/**
 * Deletes a video/stream altogether with its chat messages from the database permanently.
 * @param uuid {String} The uuid of the video/stream to delete.
 */
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

/**
 * Creates a new stream/video entity in the database.
 * @param name {String} The displayname.
 * @param shortName {String} The URL slug. Must be unique.
 * @param src {StreamSourceInput[]} A list of URL-weight pairs for sources.
 * @param description {String} Description text of the stream/video. Accepts markdown-formatting.
 * @param chat {boolean} True if the chat should be enabled for this stream.
 * @param startTime {number} 0 if the stream should be available instantly, unix timestamp of release time otherwise.
 * @param collectionUuid {string} The uuid of the associated collection the video should be part of.
 */
export const addNewStream = async (
  name: string,
  shortName: string,
  src: StreamSourceInput[],
  description: string,
  chat: boolean,
  startTime: number,
  collectionUuid: string
): Promise<Stream> => {
  const sources: StreamSource[] = []
  for (const source of src) {
    if (!(source.url && source.weight)) {
      continue
    }
    const sourceEntry = new StreamSource(source.url, source.weight)
    await streamSourceRepository.save(sourceEntry)
    sources.push(sourceEntry)
  }
  const stream = new Stream()
  stream.name = name
  stream.shortName = shortName
  stream.sources = sources
  stream.description = description
  stream.chat = chat
  stream.startTime = startTime
  if (collectionUuid !== '') {
    stream.collection = await collectionRepository.findOne({
      uuid: collectionUuid
    })
  } else {
    stream.collection = null
  }
  return streamRepository.save(stream)
}

/**
 * Overwrites an existing stream entity with new properties.
 * @param uuid {String} The uuid of the existing stream.
 * @param name {String} The displayname.
 * @param shortName {String} The URL slug. Must be unique.
 * @param newSrc {StreamSourceInput[]} A list of URL-weight pairs for sources.
 * @param description {String} Description text of the stream/video. Accepts markdown-formatting.
 * @param chat {boolean} True if the chat should be enabled for this stream.
 * @param startTime {number} 0 if the stream should be available instantly, unix timestamp of release time otherwise.
 * @param collectionUuid {string} The uuid of the associated collection the video should be part of.
 */
export const updateStream = async (
  uuid: string,
  name: string,
  shortName: string,
  newSrc: StreamSourceInput[],
  description: string,
  chat: boolean,
  startTime: number,
  collectionUuid: string
): Promise<Stream> => {
  const stream = await streamRepository.findOne({
    uuid
  })
  const sources = arrayDiff(stream.sources, newSrc, ['url', 'weight'])
  for (const source of sources.deleted) {
    await streamSourceRepository.delete(source)
    const index = stream.sources.indexOf(source as StreamSource)
    stream.sources.splice(index, 1)
  }
  for (const source of sources.added) {
    const sourceEntry = new StreamSource(source.url, source.weight)
    await streamSourceRepository.save(sourceEntry)
    stream.sources.push(sourceEntry)
  }
  stream.name = name
  stream.shortName = shortName
  stream.description = description
  stream.chat = chat
  stream.startTime = startTime
  if (collectionUuid !== '') {
    stream.collection = await collectionRepository.findOne({
      uuid: collectionUuid
    })
  } else {
    stream.collection = null
  }
  return streamRepository.save(stream)
}
