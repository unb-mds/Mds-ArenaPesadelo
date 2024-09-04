import { instanceToInstance } from "class-transformer";
import { Request, Response } from "express";
import Container from "typedi";
import ListGamesByChampionshipIdService from "../../services/ListByChampionship";
import GetChampionshipGamesResultsService from "../../services/GetChampionshipResults";
import ListGamesByPhaseService from "../../services/ListByPhase";
import UpdateGamesService from "../../services/Update";

export default class GamesController {
  public async listByChampionshipId(req: Request, res: Response): Promise<Response> {
    const { championshipId } = req.params;

    const service = Container.get(ListGamesByChampionshipIdService);

    const data = await service.execute({ championshipId });

    const response = instanceToInstance(data);

    return res.json(response);
  }

  public async getResults(req: Request, res: Response): Promise<Response> {
    const { championshipId } = req.params;

    const service = Container.get(GetChampionshipGamesResultsService);

    const data = await service.execute({ championshipId });

    const response = instanceToInstance(data);

    return res.json(response);
  }

  public async listByPhase(req: Request, res: Response): Promise<Response> {
    const phase = Number(req.query.phase);
    const { championshipId } = req.params;

    const service = Container.get(ListGamesByPhaseService);

    const data = await service.execute({ phase, championshipId });

    const response = instanceToInstance(data);

    return res.json(response);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const userId = req.user.id;
    const data = req.body;

    const service = Container.get(UpdateGamesService);

    const game = await service.execute({ gameId: id, userId, ...data });

    const response = instanceToInstance(game);

    return res.json(response);
  }
}
