import { Inject, Service } from "typedi";
import IChampionshipsRepository from "../repositories/IChampionshipsRepository";
import Championship from "../database/typeorm/entities/Championship";

interface IRequest {
  modality: number;
}

@Service()
export default class ListChampionshipByModalityService {
  constructor(
    @Inject("typeorm.championshipsRepository")
    private championshipsRepository: IChampionshipsRepository
  ) {}

  public async execute({ modality }: IRequest): Promise<Championship[]> {
    return (await this.championshipsRepository.list()).filter(
      (item) => item.modality === modality
    );
  }
}
