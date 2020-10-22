import { Stream } from './Stream'
import typeorm from 'typeorm'
const { Column, Entity, OneToMany, PrimaryGeneratedColumn } = typeorm

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
