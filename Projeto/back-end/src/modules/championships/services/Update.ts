import { Inject, Service } from "typedi";
import IChampionshipsRepository from "../repositories/IChampionshipsRepository";
import Championship from "../database/typeorm/entities/Championship";
import { addMinutes, format, isAfter, startOfDay } from "date-fns";
import ApiError from "../../../infra/errors/ApiError";
import IUsersRepository from "../../users/repositories/IUsersRepository";
import { UserAccess } from "../../users/database/typeorm/entities/User";
import getServerDate from "../../../shared/utils/getServerDate";
import { IDiskProvider } from "../../../providers/DiskProvider/models/IDiskProvider";
import { IChampionshipDTO } from "../dtos/IChampionshipDTO";

interface IRequest {
  date: string;
  from: string;
  to?: string;
  name: string;
  modality: number;
  location: string;
  participants: number;
  description?: string;
  locationLat?: number;
  locationLng?: number;
  timezoneOffset: number;
  photo?: string;
  userId: string;
  championshipId: string;
}

@Service()
export default class UpdateChampionshipsService {
  constructor(
    @Inject("typeorm.championshipsRepository")
    private championshipsRepository: IChampionshipsRepository,

    @Inject("typeorm.usersRepository")
    private usersRepository: IUsersRepository,

    @Inject("diskProviders.disk")
    private diskProvider: IDiskProvider
  ) {}

  private parseStringDate(stringDate: string): Date {
    const [year, month, day] = stringDate.split("-").map(Number);

    const date = getServerDate(new Date(year, month - 1, day));

    return date;
  }

  private parseHourString(hourString: string): number {
    const [hour, minutes] = hourString.split(":").map(Number);
    const hourToMinutes = hour * 60;

    return hourToMinutes + minutes;
  }

  public async execute(data: IRequest): Promise<Championship> {
    const { date, from, to, userId, timezoneOffset, photo, championshipId } =
      data;

    const user = await this.usersRepository.findById(userId);

    if (!user || user?.access !== UserAccess.ADMIN) {
      throw new ApiError("Apenas administradores podem editar campeonatos!");
    }

    const championship = await this.championshipsRepository.findById(
      championshipId
    );

    if (!championship) {
      throw new ApiError('Não é possível editar um registro que não existe!');
    }

    const parsedDate = addMinutes(this.parseStringDate(date), timezoneOffset);
    const parsedFrom = this.parseHourString(from);

    const championshipDateStart = addMinutes(parsedDate, parsedFrom).getTime();
    let championshipDateEnd: number | null = null;

    if (to) {
      const parsedTo = this.parseHourString(to);
      const endsIn = parsedTo < parsedFrom ? parsedTo + 1440 : parsedTo;

      championshipDateEnd = addMinutes(parsedDate, endsIn).getTime();
    }

    if (photo) await this.diskProvider.saveFiles([photo]);

    return this.championshipsRepository.update(championship, {
      dateStart: championshipDateStart,
      location: data.location,
      name: data.name,
      participants: data.participants,
      dateEnd: championshipDateEnd || undefined,
      description: data.description,
      locationLat: data.locationLat,
      locationLng: data.locationLng,
      modality: data.modality,
      photo,
    });
  }
}
