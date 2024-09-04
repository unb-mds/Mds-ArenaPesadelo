import { Inject, Service } from "typedi";
import IChampionshipsRepository from "../repositories/IChampionshipsRepository";
import ApiError from "../../../infra/errors/ApiError";
import Championship from "../database/typeorm/entities/Championship";
import IUsersRepository from "../../users/repositories/IUsersRepository";
import { UserAccess } from "../../users/database/typeorm/entities/User";

interface IRequest {
  id: string;
  userId: string;
}

@Service()
export default class DeleteChampionshipsByIdService {
  constructor(
    @Inject('typeorm.championshipsRepository')
    private championshipsRepository: IChampionshipsRepository,

    @Inject('typeorm.usersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id, userId }: IRequest): Promise<Championship> {
    const championship = await this.championshipsRepository.findById(id);

    if (!championship) throw new ApiError('Não foi possível encontrar o campeonato selecionado!');

    const user = await this.usersRepository.findById(userId);

    if (!user || user?.access !== UserAccess.ADMIN) {
      throw new ApiError('Apenas administradores podem deletar campeonatos!');
    }

    return this.championshipsRepository.delete(championship);
  }
}
