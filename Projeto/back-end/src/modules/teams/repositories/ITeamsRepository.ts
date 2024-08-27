import Team from "../database/typeorm/entities/Team";
import { ITeamsDTO } from "../dtos";

export default interface ITeamsRepository {
  create(data: ITeamsDTO): Promise<Team>;
  listByLeaderId(leaderId: string): Promise<Team[]>;
  delete(team: Team): Promise<void>;
  update(team: Team, data: Partial<ITeamsDTO>): Promise<Team>;
  findById(teamId: string): Promise<Team | undefined>;
}
