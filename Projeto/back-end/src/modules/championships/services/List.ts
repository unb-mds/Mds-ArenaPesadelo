import { Inject, Service } from "typedi";
import IChampionshipsRepository from "../repositories/IChampionshipsRepository";
import Championship from "../database/typeorm/entities/Championship";

@Service()
export default class ListChampionshipsService {
  constructor(
    @Inject('typeorm.championshipsRepository')
    private championshipsRepository: IChampionshipsRepository,
  ) {}

  public async execute(): Promise<Championship[]> {
    return this.championshipsRepository.list();
  }
}