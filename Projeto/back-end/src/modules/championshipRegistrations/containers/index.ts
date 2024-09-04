import Container from "typedi";
import IChampionshipRegistrationsRepository from "../repositories/IChampionshipRegistrationsRepository";
import ChampionshipRegistrationRepository from "../database/typeorm/repositories/ChampionshipRegistration";

Container.set<IChampionshipRegistrationsRepository>(
  'typeorm.championshipRegistrationRepository',
  new ChampionshipRegistrationRepository,
)
