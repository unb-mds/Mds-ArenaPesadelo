import { Inject, Service } from "typedi";
import { ITeamsDTO } from "../dtos";
import ITeamsRepository from "../repositories/ITeamsRepository";
import IUsersRepository from "../../users/repositories/IUsersRepository";
import Team, { Modality } from "../database/typeorm/entities/Team";
import ApiError from "../../../infra/errors/ApiError";

interface IRequest extends Partial<ITeamsDTO> {
  teamId: string;
  loggedUser: string;
}

@Service()
export default class UpdateTeams {
  constructor(
    @Inject('typeorm.teamsRepository')
    private teamsRepository: ITeamsRepository,

    @Inject('typeorm.usersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(data: IRequest): Promise<Team> {
    const { loggedUser, teamId } = data;

    const [
      author,
      team,
    ] = await Promise.all([
      await this.usersRepository.findById(loggedUser),
      await this.teamsRepository.findById(teamId)
    ])

    if (!author) {
      throw new ApiError('Não autorizado!', 401);
    }

    if (!team) {
      throw new ApiError('O time selecionado para edição não foi encontrado na base de dados!');
    }

    if (author.id !== team.leader.id) {
      throw new ApiError('Não autorizado!', 401);
    }

    if (data.modality) {
      const invalidModality = Object
        .entries(Modality)
        .every(([, mod]) => data.modality !== mod);

      if (invalidModality) {
        throw new ApiError('A modalidade inserida é inválida!');
      }
    }

    if (data.leaderId) {
      const newLeader = await this.usersRepository.findById(
        data.leaderId,
      );

      if (!newLeader) {
        throw new ApiError('O novo líder não existe na base de dados!');
      }
    }

    const updatedTeam = await this.teamsRepository.update(
      team,
      data,
    );

    return updatedTeam;
  }
}