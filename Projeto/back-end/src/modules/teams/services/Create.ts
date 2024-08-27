import { Inject, Service } from "typedi";
import ITeamsRepository from "../repositories/ITeamsRepository";
import IUsersRepository from "../../users/repositories/IUsersRepository";
import Team, { Modality } from "../database/typeorm/entities/Team";
import { ITeamsDTO } from "../dtos";
import ApiError from "../../../infra/errors/ApiError";
import { IDiskProvider } from "../../../providers/DiskProvider/models/IDiskProvider";

@Service()
export default class CreateTeams {
  constructor(
    @Inject('typeorm.teamsRepository')
    private teamsRepository: ITeamsRepository,

    @Inject('typeorm.usersRepository')
    private usersRepository: IUsersRepository,

    @Inject('diskProviders.disk')
    private diskProvider: IDiskProvider,
  ) {}

  public async execute(data: ITeamsDTO): Promise<Team> {
    const { leaderId, modality, photo } = data;

    const leader = await this.usersRepository.findById(leaderId);

    if (!leader) {
      throw new ApiError('Não foi possível localizar o líder do time na base de dados!');
    }

    const invalidModality = Object
      .entries(Modality)
      .every(([, mod]) => mod !== modality);

    if (invalidModality) {
      throw new ApiError('A modalidade escolhida é inválida!');
    }

    if (photo) await this.diskProvider.saveFiles([photo]);

    const team = await this.teamsRepository.create(data);

    return team;
  }
}
