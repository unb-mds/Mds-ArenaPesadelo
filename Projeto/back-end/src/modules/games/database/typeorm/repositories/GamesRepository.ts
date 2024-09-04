import { Repository } from "typeorm";
import IGamesRepository, { IChampionshipResults } from "../../../repositories/IGamesRepository";
import Game from "../entities/Game";
import { connection } from "../../../../../database/connection";
import { IGamesDTO } from "../../../dtos";

export default class GamesRepository implements IGamesRepository {
  private ormRepository: Repository<Game>;

  constructor() {
    this.ormRepository = connection.getRepository(Game);
  }

  public async create(data: IGamesDTO): Promise<Game> {
    const game = this.ormRepository.create({
      home: data.home,
      visitor: data.visitor,
      cardinal: data.cardinal,
      phase: data.phase,
      championship_id: data.championshipId,
      home_score: data.homeScore,
      visitor_score: data.visitorScore,
    });

    await this.ormRepository.save(game);

    return game;
  }

  public async getResults(championshipId: string): Promise<IChampionshipResults[]> {
    const results = await this.ormRepository.query(`
      WITH team_stats AS (
        SELECT
            t.name AS team_name,
            SUM(CASE
                WHEN g.home = t.id AND g.home_score > g.visitor_score THEN 1
                WHEN g.visitor = t.id AND g.visitor_score > g.home_score THEN 1
                ELSE 0
            END) AS wins,
            SUM(CASE
                WHEN g.home = t.id AND g.home_score < g.visitor_score THEN 1
                WHEN g.visitor = t.id AND g.visitor_score < g.home_score THEN 1
                ELSE 0
            END) AS losses,
            SUM(CASE
                WHEN g.home_score = g.visitor_score THEN 1
                ELSE 0
            END) AS draws,
            SUM(CASE
                WHEN g.home = t.id THEN g.home_score
                WHEN g.visitor = t.id THEN g.visitor_score
                ELSE 0
            END) AS goals_for,
            SUM(CASE
                WHEN g.home = t.id THEN g.visitor_score
                WHEN g.visitor = t.id THEN g.home_score
                ELSE 0
            END) AS goals_against
        FROM
            teams t
        LEFT JOIN
            games g ON t.id = g.home OR t.id = g.visitor
        WHERE
            g.championship_id = '${championshipId}'
        GROUP BY
            t.name
      ),
      team_ranking AS (
          SELECT
              team_name,
              wins,
              losses,
              draws,
              goals_for,
              goals_against,
              (wins * 3) + (draws * 1) AS points,
              ROW_NUMBER() OVER (ORDER BY (wins * 3) + (draws * 1) DESC, goals_for - goals_against DESC) AS rank
          FROM
              team_stats
      )
      SELECT
          rank,
          team_name,
          wins,
          draws,
          losses,
          goals_for,
          goals_against,
          points
      FROM
          team_ranking
      ORDER BY
          rank;
    `);

    return results;
  }

  public async listByChampionshipId(
    championshipId: string,
  ): Promise<Game[]> {
    return this.ormRepository.find({
      where: { championship_id: championshipId },
      relations: ["host", "visiting"],
      order: { phase: 'ASC', cardinal: 'ASC' }
    });
  }

  public async listByPhase(
    championshipId: string,
    phase: number
  ): Promise<Game[]> {
    return this.ormRepository.find({
      where: { phase, championship_id: championshipId },
      relations: ["host", "visiting"],
    });
  }

  public async update(game: Game, data: Partial<IGamesDTO>): Promise<Game> {
    const updatedGame = this.ormRepository.merge(game, {
      home_score: data.homeScore,
      visitor_score: data.visitorScore,
      home: data.home,
      visitor: data.visitor,
    });

    await this.ormRepository.save(updatedGame);

    return updatedGame;
  }

  public async findById(id: string): Promise<Game | undefined> {
    return (await this.ormRepository.findOne({ where: { id } })) || undefined;
  }

  public async getNextGame(game: Game): Promise<Game | undefined> {
    const { phase, championship_id } = game;
    const cardinal = game.cardinal % 2 === 0 ? game.cardinal - 1 : game.cardinal;

    const nextGame = await this.ormRepository.findOne({
      where: {
        championship_id,
        phase: phase + 1,
        cardinal,
      }
    });

    return nextGame || undefined;
  }
}