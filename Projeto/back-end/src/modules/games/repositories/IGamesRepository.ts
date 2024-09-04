import Game from "../database/typeorm/entities/Game";
import { IGamesDTO } from "../dtos";

export interface IChampionshipResults {
  rank: string;
  team_name: string;
  wins: string;
  draws: string;
  losses: string;
  goals_for: string;
  goals_against: string;
  points: string;
}

export default interface IGamesRepository {
  create(data: IGamesDTO): Promise<Game>;

  listByPhase(championshipId: string, phase: number): Promise<Game[]>;
  getResults(championshipId: string): Promise<IChampionshipResults[]>;
  listByChampionshipId(championshipId: string): Promise<Game[]>;
  getNextGame(game: Game): Promise<Game | undefined>;

  update(game: Game, data: Partial<IGamesDTO>): Promise<Game>;

  findById(id: string): Promise<Game | undefined>;
}