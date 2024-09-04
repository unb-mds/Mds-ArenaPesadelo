import { Exclude, Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum UserAccess {
  'USER' = 1,
  'ADMIN' = 2,
}

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: '255', nullable: false })
  full_name: string;

  @Column('varchar', { length: '255', nullable: false, unique: true })
  email: string;

  @Exclude()
  @Column('varchar', { length: '255', nullable: false })
  password: string;

  @Column('time with time zone')
  last_active: number;

  @Column('varchar', { length: 255, nullable: true })
  registration?: string;

  @Column('int', { nullable: false, default: 1 })
  access: UserAccess;

  @Expose({ name: 'access_label' })
  getAccessLabel(): string {
    const labels = {
      1: 'Atleta',
      2: 'Administrador',
    };

    return labels[this.access];
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
