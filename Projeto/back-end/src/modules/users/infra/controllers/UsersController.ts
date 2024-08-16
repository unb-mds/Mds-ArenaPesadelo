import { Request, Response } from "express";
import Container from "typedi";
import CreateUsers from "../../services/CreateUsers";
import EditUsers from "../../services/EditUsers";

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    const service = Container.get(CreateUsers);

    const user = await service.execute(data);

    return res.status(201).json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params;
    const data = req.body;

    const service = Container.get(EditUsers);

    const user = await service.execute({ data, userId });

    return res.status(200).json(user);
  }
}
