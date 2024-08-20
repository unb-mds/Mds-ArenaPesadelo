import { Inject, Service } from "typedi";
import ITeamsRepository from "../repositories/ITeamsRepository";
import Team from "../database/typeorm/entities/Team";
import ApiError from "../../../infra/errors/ApiError";

interface IRequest {
  id: string;
}

@Service()
export class FindTeamById {
  constructor(
    @Inject('typeorm.teamsRepository')
    private teamsRepository: ITeamsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Team> {
    const team = await this.teamsRepository.findById(id);

    if (!team) {
      throw new ApiError('Não foi possível encontrar o time selecionado!');
    }

    return team;
  }
}