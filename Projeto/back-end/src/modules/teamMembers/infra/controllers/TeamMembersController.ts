import { Request, Response } from "express";
import Container from "typedi";
import ListTeamMembersByTeamId from "../../services/ListByTeamId";
import { instanceToInstance } from "class-transformer";
import FindTeamMemberById from "../../services/FindById";
import CreateTeamMembers from "../../services/Create";
import UpdateTeamMembers from "../../services/Update";
import DeleteTeamMember from "../../services/Delete";

export default class TeamMembersController {
  public async listByTeamId(req: Request, res: Response): Promise<Response> {
    const { teamId } = req.params;

    const service = Container.get(ListTeamMembersByTeamId);

    const members = await service.execute({ teamId });

    const response = instanceToInstance(members);

    return res.json(response);
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const service = Container.get(FindTeamMemberById);

    const member = await service.execute({ id });

    const response = instanceToInstance(member);

    return res.json(response);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    const userId = req.user.id;

    const service = Container.get(CreateTeamMembers);

    const member = await service.execute({ ...data, userId });

    const response = instanceToInstance(member);

    return res.json(response);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const data = req.body;
    const userId = req.user.id;

    const service = Container.get(UpdateTeamMembers);

    const member = await service.execute({ id, userId, ...data });

    const response = instanceToInstance(member);

    return res.json(response);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const userId = req.user.id;

    const service = Container.get(DeleteTeamMember);

    const member = await service.execute({ id, userId });

    const response = instanceToInstance(member);

    return res.json(response);
  }
}
