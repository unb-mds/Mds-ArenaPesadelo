import { Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import modalities from "../../../../../constants/modalities";

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

  @Expose({ name: 'modality_name' })
  getModalityName(): string {
    const modality = modalities.find(item => item.value === this.modality);

    return modality!.label;
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
