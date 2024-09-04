import { Service } from "typedi";
import ITeamMembersRepository from "../../../repositories/ITeamMembersRepository";
import { Repository } from "typeorm";
import TeamMember from "../entities/TeamMember";
import { connection } from "../../../../../database/connection";
import ITeamMemberDTO from "../../../dtos/ITeamMemberDTO";

@Service("typeorm.teamMembersRepository")
export default class TeamMembersRepository implements ITeamMembersRepository {
  private ormRepository: Repository<TeamMember>;

  constructor() {
    this.ormRepository = connection.getRepository(TeamMember);
  }

  public async create(data: ITeamMemberDTO): Promise<TeamMember> {
    const member = this.ormRepository.create({
      name: data.name,
      registration: data.registration,
      team_id: data.teamId,
    });

    await this.ormRepository.save(member);

    return member;
  }

  public async findById(
    id: string,
    relations: string[] = []
  ): Promise<TeamMember | undefined> {
    return (
      (await this.ormRepository.findOne({ where: { id }, relations })) ||
      undefined
    );
  }

  public async listByTeamId(id: string): Promise<TeamMember[]> {
    return this.ormRepository.find({ where: { team_id: id } });
  }

  public async delete(member: TeamMember): Promise<void> {
    await this.ormRepository.remove(member);
  }

  public async update(
    member: TeamMember,
    data: Partial<ITeamMemberDTO>
  ): Promise<TeamMember> {
    const updatedMember = this.ormRepository.merge(member, {
      name: data.name,
      registration: data.registration,
      team_id: data.teamId,
    });

    await this.ormRepository.save(updatedMember);

    return updatedMember;
  }
}
