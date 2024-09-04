import { Service } from "typedi";
import IChampionshipsRepository from "../../../repositories/IChampionshipsRepository";
import { MoreThan, Repository } from "typeorm";
import Championship from "../entities/Championship";
import { connection } from "../../../../../database/connection";
import { IChampionshipDTO } from "../../../dtos/IChampionshipDTO";
import getServerDate from "../../../../../shared/utils/getServerDate";

@Service("typeorm.championshipsRepository")
export default class ChampionshipsRepository
  implements IChampionshipsRepository
{
  private ormRepository: Repository<Championship>;

  constructor() {
    this.ormRepository = connection.getRepository(Championship);
  }

  public async create(data: IChampionshipDTO): Promise<Championship> {
    const championship = this.ormRepository.create({
      date_end: data.dateEnd,
      date_start: data.dateStart,
      description: data.description,
      location: data.location,
      location_lat: data.locationLat,
      location_lng: data.locationLng,
      name: data.name,
      participants: data.participants,
      modality: data.modality,
      photo: data.photo,
    });

    await this.ormRepository.save(championship);

    return championship;
  }

  public async listOngoing(): Promise<Championship[]> {
    const now = getServerDate().getTime();

    return this.ormRepository
      .createQueryBuilder("championships")
      .where(
        `
          (
            (date_end IS NOT NULL AND date_start < :now AND date_end > :now) OR
            (date_end IS NULL AND date_start < :now)
          )
        `,
        { now }
      )
      .getMany();
  }

  public async listUpcoming(): Promise<Championship[]> {
    const now = getServerDate().getTime();

    return this.ormRepository.find({
      where: { date_start: MoreThan(now) },
      relations: ['registrations'],
    });
  }

  public async list(relations: string[] = []): Promise<Championship[]> {
    return this.ormRepository.find({ relations });
  }

  public async findById(
    id: string,
    relations: string[] = []
  ): Promise<Championship | undefined> {
    return (
      (await this.ormRepository.findOne({ where: { id }, relations })) ||
      undefined
    );
  }

  public async update(
    championship: Championship,
    data: Partial<IChampionshipDTO>
  ): Promise<Championship> {
    const updated = this.ormRepository.merge(championship, {
      date_end: data.dateEnd,
      date_start: data.dateStart,
      description: data.description,
      location: data.location,
      location_lat: data.locationLat,
      location_lng: data.locationLng,
      name: data.name,
      participants: data.participants,
      modality: data.modality,
      photo: data.photo,
    });

    await this.ormRepository.save(updated);

    return updated;
  }

  public async delete(championship: Championship): Promise<Championship> {
    return this.ormRepository.remove(championship);
  }
}
