import { Request, Response } from "express";
import Container from "typedi";
import CreateUsers from "../../services/CreateUsers";

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    const service = Container.get(CreateUsers);

    const user = await service.execute(data);

    return res.status(201).json(user);
  }
}
