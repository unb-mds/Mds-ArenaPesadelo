import ChampionshipRegistration from "../database/typeorm/entities/ChampionshipRegistration";
import { IChampionshipRegistrationsDTO } from "../dtos/IChampionshipRegistrationsDTO";

export default interface IChampionshipRegistrationsRepository {
  create(data: IChampionshipRegistrationsDTO): Promise<ChampionshipRegistration>;
  findDuplicates(data: IChampionshipRegistrationsDTO): Promise<ChampionshipRegistration | undefined>;
}