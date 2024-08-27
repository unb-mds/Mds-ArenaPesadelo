import Container from "typedi";
import ITeamsRepository from "../repositories/ITeamsRepository";
import TeamsRepository from "../database/typeorm/repositories/TeamsRepository";

Container.set<ITeamsRepository>(
  'typeorm.teamsRepository',
  new TeamsRepository,
);
