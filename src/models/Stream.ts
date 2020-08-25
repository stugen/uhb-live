import typeorm from 'typeorm'
const { Entity, Column, PrimaryGeneratedColumn } = typeorm

@Entity()
export class Stream {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  shortName: string;

  @Column()
  name: string;

  @Column()
  source: string;

  @Column()
  startTime?: number;

  @Column()
  chat?: boolean;
}
