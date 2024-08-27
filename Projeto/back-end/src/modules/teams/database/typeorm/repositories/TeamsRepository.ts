import { Service } from "typedi";
import { Repository } from "typeorm";
import Team from "../entities/Team";
import { connection } from "../../../../../database/connection";
import ITeamsRepository from "../../../repositories/ITeamsRepository";
import { ITeamsDTO } from "../../../dtos";

@Service("typeorm.teamsRepository")
export default class TeamsRepository implements ITeamsRepository {
  private ormRepository: Repository<Team>;

  constructor() {
    this.ormRepository = connection.getRepository(Team);
  }

  public async create(data: ITeamsDTO): Promise<Team> {
    const team = this.ormRepository.create({
      leader_id: data.leaderId,
      name: data.name,
      description: data.description,
      modality: data.modality,
    });

    await this.ormRepository.save(team);

    return team;
  }

  public async listByLeaderId(leaderId: string): Promise<Team[]> {
    return this.ormRepository.find({
      where: { leader_id: leaderId },
    });
  }

  public async update(team: Team, data: Partial<ITeamsDTO>): Promise<Team> {
    const updatedTeam = this.ormRepository.merge(team, {
      name: data.name,
      description: data.description,
      modality: data.modality,
      leader_id: data.leaderId,
    });

    await this.ormRepository.save(updatedTeam);

    return updatedTeam;
  }

  public async delete(team: Team): Promise<void> {
    await this.ormRepository.remove(team);
  }

  public async findById(teamId: string): Promise<Team | undefined> {
    return (await this.ormRepository.findOne({
      where: { id: teamId },
      relations: ["leader"],
    })) || undefined;
  }
}
