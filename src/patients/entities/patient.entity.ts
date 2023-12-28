import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'patients' })
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column()
  dateOfBirth: Date;

  @Column({ length: 6 })
  gender: string;

  @Column({ length: 100, nullable: true })
  address: string;

  @Column({ length: 20, nullable: true })
  phoneNumber: string;

  @Column({ length: 100, unique: true })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
