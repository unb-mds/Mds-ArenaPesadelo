import { Inject, Service } from "typedi";
import Team from "../database/typeorm/entities/Team";
import ITeamsRepository from "../repositories/ITeamsRepository";
import IUsersRepository from "../../users/repositories/IUsersRepository";
import ApiError from "../../../infra/errors/ApiError";

interface IRequest {
  leaderId: string;
}

@Service()
export default class ListTeamsByLeaderId {
  constructor(
    @Inject('typeorm.teamsRepository')
    private teamsRepository: ITeamsRepository,

    @Inject('typeorm.usersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ leaderId }: IRequest): Promise<Team[]> {
    const leader = await this.usersRepository.findById(leaderId);

    if (!leader) {
      throw new ApiError('Líder não encontrado na base de dados!');
    }

    const teams = await this.teamsRepository.listByLeaderId(leader.id);

    return teams;
  }
}