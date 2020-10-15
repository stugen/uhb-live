import { Stream } from './Stream'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

/**
 * This entity represents a browsable collection of streams/videos.
 */
@Entity()
export class Collection {
  /** Unique identifier of the collection. */
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  /** Display name of the collection. */
  @Column()
  name: string;

  /** Slug that is used in the URL. */
  @Column()
  shortName: string;

  /** Description of the collection. Allows markdown-formatting. */
  @Column()
  description: string;

  /** Streams/videos that are part of this collection. */
  @OneToMany(() => Stream, stream => stream.collection)
  items: Stream[]
}
