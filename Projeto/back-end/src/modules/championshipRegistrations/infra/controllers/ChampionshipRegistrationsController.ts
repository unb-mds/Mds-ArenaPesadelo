import { Request, Response } from "express";
import Container from "typedi";
import CreateChampionshipRegistrationsService from "../../services/Create";
import { instanceToInstance } from "class-transformer";

export default class ChampionshipRegistrationsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    const userId = req.user.id;

    data.userId = userId;

    const service = Container.get(CreateChampionshipRegistrationsService);

    const registration = await service.execute(data);

    const response = instanceToInstance(registration);

    return res.json(response);
  }
}