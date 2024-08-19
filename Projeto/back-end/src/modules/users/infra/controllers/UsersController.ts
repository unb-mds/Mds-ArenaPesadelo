import { Request, Response } from "express";
import Container from "typedi";
import CreateUsers from "../../services/CreateUsers";
import EditUsers from "../../services/EditUsers";
import CreateSessions from "../../services/CreateSessions";

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    const service = Container.get(CreateUsers);

    const user = await service.execute(data);

    return res.status(201).json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.user;
    const data = req.body;

    const service = Container.get(EditUsers);

    const user = await service.execute({ data, userId });

    return res.status(200).json(user);
  }

  public async createSessions(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const service = Container.get(CreateSessions);

    const response = await service.execute({ email, password });

    return res.status(200).json(response);
  }
}
