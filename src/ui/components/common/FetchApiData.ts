import { StreamMetadata } from '../stream/StreamMetadata'
import { CollectionMetadata } from '../collection/CollectionMetadata'

export enum MetadataType {
  STREAM,
  COLLECTION
}

export const getMetadata = async (name: string, type: MetadataType): Promise<StreamMetadata | CollectionMetadata> => {
  const sanitized = encodeURIComponent(name.replace(/\//, '').replace(/\./, ''))
  const urlType = type === MetadataType.STREAM ? 'stream' : 'collection'
  const response = await window.fetch(`/api/v1/${urlType}/${sanitized}`, {
    mode: 'cors',
    cache: 'no-cache'
  })
  const json = await response.json() as unknown as (StreamMetadata | CollectionMetadata)
  if (!response || !json) {
    throw new Error('Request failed.')
  }
  return json
}
