import { StreamMetadata } from '../stream/StreamMetadata'

export interface CollectionMetadata {
  uuid: string;
  name: string;
  shortName: string;
  description: string;
  items: StreamMetadata[]
}
