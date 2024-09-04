import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Team from "../../../../teams/database/typeorm/entities/Team";
import Championship from "../../../../championships/database/typeorm/entities/Championship";

@Entity('championship_registrations')
export default class ChampionshipRegistration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  team_id: string;

  @Column('uuid')
  championship_id: string;

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @ManyToOne(() => Championship)
  @JoinColumn({ name: 'championship_id' })
  championship: Championship;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
