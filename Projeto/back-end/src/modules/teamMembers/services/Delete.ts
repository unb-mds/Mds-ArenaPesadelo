import { Inject, Service } from "typedi";
import ITeamMembersRepository from "../repositories/ITeamMembersRepository";
import TeamMember from "../database/typeorm/entities/TeamMember";
import ApiError from "../../../infra/errors/ApiError";

interface IRequest {
  id: string;
  userId: string;
}

@Service()
export default class DeleteTeamMember {
  constructor(
    @Inject('typeorm.teamMembersRepository')
    private teamMembersRepository: ITeamMembersRepository,
  ) {}

  public async execute({ id, userId }: IRequest): Promise<TeamMember> {
    const member = await this.teamMembersRepository.findById(id, ['team']);

    if (!member) throw new ApiError('Membro não encontrado!');

    if (member.team.leader_id !== userId) throw new ApiError('Apenas o líder pode prosseguir com essa ação!', 401);

    await this.teamMembersRepository.delete(member);

    return member;
  }
}
