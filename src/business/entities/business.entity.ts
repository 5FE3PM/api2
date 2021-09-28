import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from '../../address/address.entity';
import { Provider } from '../../providers/provider.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity({ name: 'businesses' })
export class Business extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Provider)
  @JoinColumn()
  provider: Provider;

  name: string;

  @Column({ nullable: true })
  logo: string;

  @ManyToOne(() => Category, (category) => category.id)
  category: Category;
}
