import { Inject, Service } from "typedi";
import IChampionshipRegistrationsRepository from "../repositories/IChampionshipRegistrationsRepository";
import IChampionshipsRepository from "../../championships/repositories/IChampionshipsRepository";
import ChampionshipRegistration from "../database/typeorm/entities/ChampionshipRegistration";
import { IChampionshipRegistrationsDTO } from "../dtos/IChampionshipRegistrationsDTO";
import ITeamsRepository from "../../teams/repositories/ITeamsRepository";
import ApiError from "../../../infra/errors/ApiError";
import IGamesRepository from "../../games/repositories/IGamesRepository";
import shuffleArray from "../../../shared/utils/shuffleArray";

interface IRequest extends IChampionshipRegistrationsDTO {
  userId: string;
}

@Service()
export default class CreateChampionshipRegistrationsService {
  constructor(
    @Inject('typeorm.championshipRegistrationRepository')
    private championshipRegistrationRepository: IChampionshipRegistrationsRepository,

    @Inject('typeorm.championshipsRepository')
    private championshipsRepository: IChampionshipsRepository,

    @Inject('typeorm.teamsRepository')
    private teamsRepository: ITeamsRepository,

    @Inject("typeorm.gamesRepository")
    private gamesRepository: IGamesRepository,
  ) {}

  public async execute(data: IRequest): Promise<ChampionshipRegistration> {
    const { championshipId, teamId, userId } = data;

    const [
      championship,
      team,
      duplicated,
    ] = await Promise.all([
      this.championshipsRepository.findById(championshipId),
      this.teamsRepository.findById(teamId),
      this.championshipRegistrationRepository.findDuplicates(data),
    ]);

    if (!championship) {
      throw new ApiError('Campeonato não encontrado!');
    }

    if (!team) {
      throw new ApiError('O time que está tentando se inscrever neste campeonato não foi encontrado!');
    }

    if (team.leader_id !== userId) {
      throw new ApiError('Apenas o líder pode inscrever o time para um campeonato!');
    }

    if (team.modality !== championship.modality) {
      throw new ApiError('Este time não se enquadra na modalidade do campeonato!');
    }

    if (duplicated) {
      throw new ApiError('Seu time já foi inscrito nesse campeonato!');
    }

    const registrations = await this.championshipRegistrationRepository.listByChampionshipId(
      championship.id,
    );

    if (registrations.length === championship.participants) {
      throw new ApiError('As vagas para este campeonato se esgotaram!');
    }

    const registration = await this.championshipRegistrationRepository.create(data);

    if ((registrations.length + 1) === championship.participants) {
      const games = championship.participants / 2;

      const updatedRegistrations = await this.championshipRegistrationRepository
        .listByChampionshipId(championship.id);
      const randomizedRegistrations = shuffleArray(updatedRegistrations);

      let phase = 1;

      for (let i = games; i >= 1; i /= 2) {
        for (let j = 0; j < i; j++) {
          const [home, visitor] = randomizedRegistrations.splice(0, 2);

          await this.gamesRepository.create({
            cardinal: j + 1,
            phase,
            championshipId: championship.id,
            home: home?.team_id,
            visitor: visitor?.team_id,
          });
        }

        phase += 1;
      }
    }

    return registration;
  }
}
