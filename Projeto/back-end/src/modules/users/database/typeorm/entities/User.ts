import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: '255', nullable: false })
  full_name: string;

  @Column('varchar', { length: '255', nullable: false, unique: true })
  email: string;

  @Column('varchar', { length: '255', nullable: false })
  password: string;

  @Column('time with time zone')
  last_active: number;

  @Column('varchar', { length: 255, nullable: true })
  registration?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
