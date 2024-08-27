import { Inject, Service } from "typedi";
import ITeamsRepository from "../../teams/repositories/ITeamsRepository";
import ITeamMembersRepository from "../repositories/ITeamMembersRepository";
import TeamMember from "../database/typeorm/entities/TeamMember";
import ITeamMemberDTO from "../dtos/ITeamMemberDTO";
import ApiError from "../../../infra/errors/ApiError";

type IRequest = ITeamMemberDTO & {
  userId: string;
};

@Service()
export default class CreateTeamMembers {
  constructor(
    @Inject('typeorm.teamsRepository')
    private teamsRepository: ITeamsRepository,

    @Inject('typeorm.teamMembersRepository')
    private teamMembersRepository: ITeamMembersRepository,
  ) {}

  public async execute(data: IRequest): Promise<TeamMember> {
    const { teamId } = data;

    const team = await this.teamsRepository.findById(teamId);

    if (!team) throw new ApiError('O time selecionado para esse membro não foi encontrado!');

    if (team.leader_id !== data.userId) throw new ApiError('Apenas o líder pode prosseguir com essa ação!', 401);

    const member = await this.teamMembersRepository.create(data);

    return member;
  }
}
