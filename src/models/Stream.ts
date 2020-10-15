import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm'
import { StreamSource } from './StreamSource'
import { Collection } from './Collection'

/**
 * Entity that represents a stream/video.
 */
@Entity()
export class Stream {
  /** Unique identifier. */
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  /** Slug that is used for the URL. */
  @Column()
  shortName: string;

  /** Display name that is shown as title for the stream. */
  @Column()
  name: string;

  /** Description of the stream. Allows markdown-formatting. */
  @Column()
  description: string;

  /** List of weighted sources that are available for the stream/video. */
  @OneToMany(() => StreamSource, source => source.stream)
  sources: StreamSource[];

  /** Optional unix-timestamp of the time when the stream should be published. */
  @Column()
  startTime?: number;

  /** True if a chat-room should be available for this video/stream. */
  @Column()
  chat: boolean;

  /** Collection to which this stream/video belongs to. */
  @ManyToOne(() => Collection, collection => collection.items)
  collection: Collection
}
