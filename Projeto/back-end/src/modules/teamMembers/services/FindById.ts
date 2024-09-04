import { Inject, Service } from "typedi";
import ITeamMembersRepository from "../repositories/ITeamMembersRepository";
import TeamMember from "../database/typeorm/entities/TeamMember";
import ApiError from "../../../infra/errors/ApiError";

interface IRequest {
  id: string;
}

@Service()
export default class FindTeamMemberById {
  constructor(
    @Inject('typeorm.teamMembersRepository')
    private teamMembersRepository: ITeamMembersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<TeamMember> {
    const member = await this.teamMembersRepository.findById(id, ['team']);

    if (!member) throw new ApiError('Membro não encontrado!');

    return member;
  }
}
