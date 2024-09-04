import Container from "typedi";

import IGamesRepository from "../repositories/IGamesRepository";
import GamesRepository from "../database/typeorm/repositories/GamesRepository";

Container.set<IGamesRepository>(
  'typeorm.gamesRepository',
  new GamesRepository,
);
