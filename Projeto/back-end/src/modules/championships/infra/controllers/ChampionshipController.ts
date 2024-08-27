import { Request, Response } from "express";
import Container from "typedi";
import ListOngoingChampionshipsService from "../../services/ListOngoing";
import { instanceToInstance } from "class-transformer";
import ListUpcomingChampionshipsService from "../../services/ListUpcoming";
import CreateChampionshipsService from "../../services/Create";
import ListChampionshipsService from "../../services/List";
import FindChampionshipsByIdService from "../../services/FindById";

export default class ChampionshipController {
  public async listOngoing(req: Request, res: Response): Promise<Response> {
    const service = Container.get(ListOngoingChampionshipsService);

    const championships = await service.execute();

    const response = instanceToInstance(championships);

    return res.json(response);
  }

  public async listUpcoming(req: Request, res: Response): Promise<Response> {
    const service = Container.get(ListUpcomingChampionshipsService);

    const championships = await service.execute();

    const response = instanceToInstance(championships);

    return res.json(response);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    const userId = req.user.id;
    const filename = req.file?.filename;

    const service = Container.get(CreateChampionshipsService);

    data.userId = userId;
    data.timezoneOffset = 180;
    data.photo = filename;

    const championship = await service.execute(data);

    const response = instanceToInstance(championship);

    return res.json(response);
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const service = Container.get(ListChampionshipsService);

    const championships = await service.execute();

    const response = instanceToInstance(championships);

    return res.json(response);
  }

  public async find(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const service = Container.get(FindChampionshipsByIdService);

    const championship = await service.execute({ id });

    const response = instanceToInstance(championship);

    return res.json(response);
  }
}
