import Championship from "../database/typeorm/entities/Championship";
import { IChampionshipDTO } from "../dtos/IChampionshipDTO";

export default interface IChampionshipsRepository {
  create(data: IChampionshipDTO): Promise<Championship>;
  listOngoing(): Promise<Championship[]>;
  listUpcoming(): Promise<Championship[]>;
  list(relations?: string[]): Promise<Championship[]>;
  findById(id: string, relations?: string[]): Promise<Championship | undefined>;
  update(
    championship: Championship,
    data: Partial<IChampionshipDTO>
  ): Promise<Championship>;
  delete(championship: Championship): Promise<Championship>;
}
