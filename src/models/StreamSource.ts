import typeorm from 'typeorm'
import { Stream } from './Stream'
const { Entity, Column, ManyToOne, PrimaryGeneratedColumn } = typeorm

/**
 * Interface to represent the data that is given from the frontend to the server.
 */
export interface StreamSourceInput {
  /** URL under which the source is available. */
  url: string;

  /** Weight-factor for load-balancing. */
  weight: number;
}

/**
 * Entity that represents a single stream/video source.
 */
@Entity()
export class StreamSource {
  /**
   * Instantiates a new stream-source with the given URL and weight.
   */
  constructor (url: string, weight: number) {
    this.url = url
    this.weight = weight
  }

  /** Unique identifier of this source. */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** URL under which the source is available. */
  @Column()
  url: string;

  /**
   * Weight that is used for load-balancing.
   * When multiple sources are defined for a video/stream, a source with a higher weight is more likely to be chosen.
   */
  @Column()
  weight: number;

  /** The associated stream to this source. */
  @ManyToOne('Stream', 'sources')
  stream: Stream;
}
