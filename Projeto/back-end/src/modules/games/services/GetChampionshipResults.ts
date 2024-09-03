import { Inject, Service } from "typedi";
import IChampionshipsRepository from "../../championships/repositories/IChampionshipsRepository";
import IGamesRepository, { IChampionshipResults } from "../repositories/IGamesRepository";
import ApiError from "../../../infra/errors/ApiError";

interface IRequest {
  championshipId: string;
}

@Service()
export default class GetChampionshipGamesResultsService {
  constructor(
    @Inject("typeorm.championshipsRepository")
    private championshipsRepository: IChampionshipsRepository,

    @Inject("typeorm.gamesRepository")
    private gamesRepository: IGamesRepository,
  ) {}

  public async execute({ championshipId }: IRequest): Promise<IChampionshipResults[]> {
    const championship = await this.championshipsRepository.findById(
      championshipId
    );

    if (!championship) {
      throw new ApiError("Campeonato não encontrado!");
    }

    const results = await this.gamesRepository.getResults(
      championship.id
    );

    return results;
  }
}