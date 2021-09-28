import { Client } from 'src/clients/client.entity';
import { Provider } from 'src/providers/provider.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'emails' })
export class Email extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @OneToOne(() => Provider)
  @JoinColumn()
  provider: Provider;

  @OneToOne(() => Client)
  @JoinColumn()
  client: Client;
}
