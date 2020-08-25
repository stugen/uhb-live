import typeorm from 'typeorm'
const { Entity, Column, PrimaryGeneratedColumn } = typeorm

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  content: string;

  @Column()
  sender: string;

  @Column({ nullable: true })
  senderMail?: string;

  @Column()
  senderVerified: boolean;

  @Column()
  timestamp: number;

  @Column()
  stream: string;
}
