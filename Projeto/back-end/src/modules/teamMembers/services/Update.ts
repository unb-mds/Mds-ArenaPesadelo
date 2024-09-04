import { Inject, Service } from "typedi";
import ITeamMembersRepository from "../repositories/ITeamMembersRepository";
import ITeamMemberDTO from "../dtos/ITeamMemberDTO";
import TeamMember from "../database/typeorm/entities/TeamMember";
import ApiError from "../../../infra/errors/ApiError";

interface IRequest extends Omit<ITeamMemberDTO, 'teamId'> {
  id: string;
  userId: string;
}

@Service()
export default class UpdateTeamMembers {
  constructor(
    @Inject('typeorm.teamMembersRepository')
    private teamMembersRepository: ITeamMembersRepository,
  ) {}

  public async execute(data: IRequest): Promise<TeamMember> {
    const { id, userId, ...rest } = data;

    const member = await this.teamMembersRepository.findById(id, ['team']);

    if (!member) throw new ApiError('Membro não encontrado!');

    if (member.team.leader_id !== userId) throw new ApiError('Apenas o líder pode prosseguir com essa ação!', 401);

    return this.teamMembersRepository.update(member, rest);
  }
}
