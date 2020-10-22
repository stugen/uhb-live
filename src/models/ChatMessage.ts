import typeorm from 'typeorm'
const { Entity, Column, PrimaryGeneratedColumn } = typeorm

/**
 * This entity represents a single chat message in any room.
 */
@Entity()
export class ChatMessage {
  /** Unique identifier of the message. */
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  /** Text content of the chat message. Does not allow markdown or other syntax. */
  @Column()
  content: string;

  /** UUID of the sender. */
  @Column()
  sender: string;

  /** Optional email address of the sender (if authenticated). This field is reserved for future use. */
  @Column({ nullable: true })
  senderMail?: string;

  /** True if the sender is authenticated and using it's GitLab name. */
  @Column()
  senderVerified: boolean;

  /** UNIX-timestamp when the message was sent. */
  @Column()
  timestamp: number;

  /** Unique identifier of the stream at whose chat room the message was sent. */
  @Column()
  stream: string;
}
