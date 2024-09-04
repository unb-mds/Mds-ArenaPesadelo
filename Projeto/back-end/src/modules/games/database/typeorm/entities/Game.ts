import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Team from "../../../../teams/database/typeorm/entities/Team";

@Entity('games')
export default class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { nullable: true })
  home?: string | null;

  @Column('uuid', { nullable: true })
  visitor?: string | null;

  @Column('int')
  home_score: number;

  @Column('int')
  visitor_score: number;

  @Column('int')
  cardinal: number;

  @Column('int')
  phase: number;

  @Column('uuid')
  championship_id: string;

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'home' })
  host: Team;

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'visitor' })
  visiting: Team;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
