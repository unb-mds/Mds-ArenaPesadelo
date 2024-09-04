import { Inject, Service } from "typedi";
import ITeamsRepository from "../../teams/repositories/ITeamsRepository";
import ITeamMembersRepository from "../repositories/ITeamMembersRepository";
import TeamMember from "../database/typeorm/entities/TeamMember";
import ApiError from "../../../infra/errors/ApiError";

interface IRequest {
  teamId: string;
}

@Service()
export default class ListTeamMembersByTeamId {
  constructor(
    @Inject('typeorm.teamsRepository')
    private teamsRepository: ITeamsRepository,

    @Inject('typeorm.teamMembersRepository')
    private teamMembersRepository: ITeamMembersRepository,
  ) {}

  public async execute({ teamId }: IRequest): Promise<TeamMember[]> {
    const team = await this.teamsRepository.findById(teamId);

    if (!team) throw new ApiError('Time não encontrado!');

    return this.teamMembersRepository.listByTeamId(team.id);
  }
}
