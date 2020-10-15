import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Stream } from './Stream'

/**
 * Entity that represents a single stream/video source.
 */
@Entity()
export class StreamSource {
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
  @ManyToOne(() => Stream, stream => stream.sources)
  stream: Stream;
}
