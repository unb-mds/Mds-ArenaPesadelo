import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from "../../../../users/database/typeorm/entities/User";
import { Exclude, Expose } from "class-transformer";
import TeamMember from "../../../../teamMembers/database/typeorm/entities/TeamMember";
import ChampionshipRegistration from "../../../../championshipRegistrations/database/typeorm/entities/ChampionshipRegistration";

export enum Modality {
  FOT_FM = 1,
  FOT_MA = 2,
  VOL_MA = 3,
  VOL_FM = 4,
  BAS_MA = 5,
  BAS_FM = 6,
  LOL = 7,
  VAL = 8,
  CS2 = 9,
}

@Entity('teams')
export default class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, nullable: false })
  name: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column('int', { nullable: false })
  modality: Modality;

  @Column('varchar', { nullable: true })
  photo?: string;

  @Exclude()
  @Column('uuid', { nullable: false })
  leader_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'leader_id' })
  leader: User;

  @OneToMany(() => TeamMember, member => member.team)
  team_members: TeamMember[];

  @OneToMany(() => ChampionshipRegistration, registration => registration.team)
  registrations: ChampionshipRegistration[];

  @Expose({ name: 'photo_url' })
  getPhotoUrl(): string | null {
    if (this.photo) {
      const url = `${process.env.APP_URL}/uploads/${this.photo}`;

      return url;
    }

    return null;
  }

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
