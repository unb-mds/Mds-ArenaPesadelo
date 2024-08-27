import Container from "typedi";

import IChampionshipsRepository from "../repositories/IChampionshipsRepository";
import ChampionshipsRepository from "../database/typeorm/repositories/ChampionshipsRepository";

Container.set<IChampionshipsRepository>(
  'typeorm.championshipsRepository',
  new ChampionshipsRepository,
);
