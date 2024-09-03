import { Repository } from "typeorm";
import IChampionshipRegistrationsRepository from "../../../repositories/IChampionshipRegistrationsRepository";
import ChampionshipRegistration from "../entities/ChampionshipRegistration";
import { connection } from "../../../../../database/connection";
import { IChampionshipRegistrationsDTO } from "../../../dtos/IChampionshipRegistrationsDTO";
import { Service } from "typedi";

@Service("typeorm.championshipRegistrationRepository")
export default class ChampionshipRegistrationRepository
  implements IChampionshipRegistrationsRepository
{
  private ormRepository: Repository<ChampionshipRegistration>;

  constructor() {
    this.ormRepository = connection.getRepository(ChampionshipRegistration);
  }

  public async create(
    data: IChampionshipRegistrationsDTO
  ): Promise<ChampionshipRegistration> {
    const registration = this.ormRepository.create({
      championship_id: data.championshipId,
      team_id: data.teamId,
    });

    await this.ormRepository.save(registration);

    return registration;
  }

  public async findDuplicates(
    data: IChampionshipRegistrationsDTO
  ): Promise<ChampionshipRegistration | undefined> {
    return (
      (await this.ormRepository.findOne({
        where: { championship_id: data.championshipId, team_id: data.teamId },
      })) || undefined
    );
  }
}