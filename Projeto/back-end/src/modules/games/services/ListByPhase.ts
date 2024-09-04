import { Inject, Service } from "typedi";
import IChampionshipsRepository from "../../championships/repositories/IChampionshipsRepository";
import IGamesRepository from "../repositories/IGamesRepository";
import Game from "../database/typeorm/entities/Game";
import ApiError from "../../../infra/errors/ApiError";

interface IRequest {
  championshipId: string;
  phase: number;
}

@Service()
export default class ListGamesByPhaseService {
  constructor(
    @Inject('typeorm.championshipsRepository')
    private championshipsRepository: IChampionshipsRepository,

    @Inject('typeorm.gamesRepository')
    private gamesRepository: IGamesRepository,
  ) {}

  public async execute({ championshipId, phase }: IRequest): Promise<Game[]> {
    const championship = await this.championshipsRepository.findById(
      championshipId
    );

    if (!championship) {
      throw new ApiError('Campeonato não encontrado!');
    }

    return this.gamesRepository.listByPhase(championship.id, phase);
  }
}