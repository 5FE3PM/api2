import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Region } from '../regions/entities/region.entity';

@Entity({ name: 'addresses' })
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstAddress: string;

  @Column()
  secondAddress: string;

  @ManyToOne(() => Region, (region) => region.id)
  @JoinColumn()
  region: Region;
}
