import { Inject, Service } from "typedi";
import { IGamesDTO } from "../dtos";
import Game from "../database/typeorm/entities/Game";
import IGamesRepository from "../repositories/IGamesRepository";
import IUsersRepository from "../../users/repositories/IUsersRepository";
import { UserAccess } from "../../users/database/typeorm/entities/User";
import ApiError from "../../../infra/errors/ApiError";

type IRequest = {
  userId: string;
  gameId: string;
  homeScore?: number;
  visitorScore?: number
}

@Service()
export default class UpdateGamesService {
  constructor(
    @Inject('typeorm.usersRepository')
    private usersRepository: IUsersRepository,

    @Inject('typeorm.gamesRepository')
    private gamesRepository: IGamesRepository,
  ) {}

  public async execute(data: IRequest): Promise<Game> {
    const user = await this.usersRepository.findById(data.userId);

    if (!user || user?.access !== UserAccess.ADMIN) {
      throw new ApiError('Você não tem permissão para realizar esta operação!');
    }

    const { gameId } = data;

    const game = await this.gamesRepository.findById(gameId);

    if (!game) {
      throw new ApiError('Não foi possível atualizar esse registro!');
    }

    const homeScore = typeof data.homeScore === 'undefined' ? game.home_score : data.homeScore;
    const visitorScore = typeof data.visitorScore === 'undefined' ? game.visitor_score : data.visitorScore;

    const draw = homeScore === visitorScore;
    const nextGame = await this.gamesRepository.getNextGame(game);

    const oddGame = game.cardinal % 2 !== 0;
    const winnerPlace = oddGame ? 'home' : 'visitor';

    if (draw && nextGame) {
      await this.gamesRepository.update(nextGame, {
        [winnerPlace]: null,
      });
    }

    if (draw || !nextGame) {
      return this.gamesRepository.update(game, {
        visitorScore,
        homeScore,
      });
    }

    const winner = homeScore > visitorScore ? game.home : game.visitor;

    await this.gamesRepository.update(nextGame, {
      [winnerPlace]: winner,
    });
    await this.gamesRepository.update(game, data);

    const updatedGame = (await this.gamesRepository.findById(game.id)) as Game;

    return updatedGame;
  }
}
