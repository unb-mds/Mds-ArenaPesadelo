import TeamMember from "../database/typeorm/entities/TeamMember";
import ITeamMemberDTO from "../dtos/ITeamMemberDTO";

export default interface ITeamMembersRepository {
  create(data: ITeamMemberDTO): Promise<TeamMember>;
  findById(id: string, relations?: string[]): Promise<TeamMember | undefined>;
  listByTeamId(id: string): Promise<TeamMember[]>;
  update(member: TeamMember, data: Partial<ITeamMemberDTO>): Promise<TeamMember>;
  delete(member: TeamMember): Promise<void>;
}
