import Container from "typedi";
import ITeamMembersRepository from "../repositories/ITeamMembersRepository";
import TeamMembersRepository from "../database/typeorm/repositories/TeamMembersRepository";

Container.set<ITeamMembersRepository>(
  'typeorm.teamMembersRepository',
  new TeamMembersRepository,
);
