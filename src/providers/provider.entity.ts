import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from '../address/address.entity';
import * as bcrypt from 'bcryptjs';

@Entity({ name: 'providers' })
export class Provider extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @Column()
  fullname: string;

  @Column()
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  validated: boolean;

  @Column()
  cash: boolean;

  @Column()
  card: boolean;

  @Column()
  sellProducts: boolean;

  @Column()
  offersServices: boolean;

  @Column()
  validationImage: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
