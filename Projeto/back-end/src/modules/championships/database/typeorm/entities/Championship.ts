import { Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import modalities from "../../../../../constants/modalities";
import ChampionshipRegistration from "../../../../championshipRegistrations/database/typeorm/entities/ChampionshipRegistration";

@Entity('championships')
export default class Championship {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, nullable: false })
  name: string;

  @Column('bigint', { nullable: false })
  date_start: number;

  @Column('bigint', { nullable: true })
  date_end?: number;

  @Column('varchar', { length: 255, nullable: false })
  location: string;

  @Column('bigint', { nullable: true })
  location_lat?: number;

  @Column('bigint', { nullable: true })
  location_lng?: number;

  @Column('text', { nullable: true })
  description?: string;

  @Column('varchar', { length: 255, nullable: true })
  photo?: string;

  @Column('int', { nullable: false })
  participants: number;

  @Column('int', { nullable: false })
  modality: number;

  @OneToMany(() => ChampionshipRegistration, registration => registration.championship)
  registrations: ChampionshipRegistration[];

  @Expose({ name: 'modality_name' })
  getModalityName(): string {
    const modality = modalities.find(item => item.value === this.modality);

    return modality!.label;
  }

  @Expose({ name: 'available_vacancies' })
  getAvailableVacancies(): number {
    if (!this.registrations?.length) return this.participants;

    const { registrations, participants } = this;

    return participants - registrations.length;
  }

  @Expose({ name: 'photo_url' })
  getPhotoUrl(): string | null {
    if (this.photo) {
      const url = `${process.env.APP_URL}/uploads/${this.photo}`;

      return url;
    }

    return null;
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
