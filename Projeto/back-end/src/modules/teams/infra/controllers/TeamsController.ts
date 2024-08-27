import { Request, Response } from "express";
import Container from "typedi";
import { FindTeamById } from "../../services/FindById";
import CreateTeams from "../../services/Create";
import ListTeamsByLeaderId from "../../services/ListByLeaderId";
import UpdateTeams from "../../services/Update";
import { instanceToInstance } from "class-transformer";
import FilterLeaderTeamsByModality from "../../services/FilterByLeaderAndModality";

export default class TeamsController {
  public async find(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const service = Container.get(FindTeamById);

    const team = await service.execute({ id });

    const response = instanceToInstance(team);

    return res.json(response);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const data = { ...req.body };
    const filename = req.file?.filename;

    const service = Container.get(CreateTeams);

    data.leaderId = req.user.id;
    data.photo = filename;

    const team = await service.execute(data);

    const response = instanceToInstance(team);

    return res.json(response);
  }

  public async listByLeaderId(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const service = Container.get(ListTeamsByLeaderId);

    const teams = await service.execute({ leaderId: id });

    const response = instanceToInstance(teams);

    return res.json(response);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { id: loggedUser } = req.user;
    const data = { ...req.body };

    const service = Container.get(UpdateTeams);

    data.teamId = id;
    data.loggedUser = loggedUser;

    const team = await service.execute(data);

    const response = instanceToInstance(team);

    return res.json(response);
  }

  public async filterLeaderTeams(req: Request, res: Response): Promise<Response> {
    const modality = Number(req.query.modality);
    const { id } = req.user;

    const service = Container.get(FilterLeaderTeamsByModality);

    const teams = await service.execute({ leaderId: id, modality });

    const response = instanceToInstance(teams);

    return res.json(response);
  }
}
