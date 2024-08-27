export interface IChampionshipDTO {
  name: string;
  dateStart: number;
  dateEnd?: number;
  location: string;
  locationLat?: number;
  locationLng?: number;
  description?: string;
  participants: number;
  modality: number;
  photo?: string;
}
