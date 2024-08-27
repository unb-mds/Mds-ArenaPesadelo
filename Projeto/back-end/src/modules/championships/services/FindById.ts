import { Inject, Service } from "typedi";
import IChampionshipsRepository from "../repositories/IChampionshipsRepository";
import ApiError from "../../../infra/errors/ApiError";
import { format } from "date-fns";

interface IRequest {
  id: string;
}

interface IResponse {
  id: string;
  date: string;
  from: string;
  name: string;
  modality: number;
  location: string;
  participants: number;
  to?: string;
  description?: string;
  location_lat?: number;
  location_lng?: number;
}

@Service()
export default class FindChampionshipsByIdService {
  constructor(
    @Inject('typeorm.championshipsRepository')
    private championshipsRepository: IChampionshipsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const championship = await this.championshipsRepository.findById(id);

    if (!championship) throw new ApiError('Não foi possível encontrar o campeonato selecionado!');

    const dateStart = Number(championship.date_start);

    const date = format(dateStart, 'yyyy-MM-dd');
    const from = format(dateStart, 'HH:mm:ss');

    const response: IResponse = {
      id,
      name: championship.name,
      modality: championship.modality,
      location: championship.location,
      participants: championship.participants,
      description: championship.description,
      location_lat: championship.location_lat,
      location_lng: championship.location_lng,
      date,
      from,
      to: undefined,
    };

    if (championship.date_end) {
      const dateEnd = Number(championship.date_end);

      response.to = format(dateEnd, 'HH:mm:ss');
    }

    return response;
  }
}
