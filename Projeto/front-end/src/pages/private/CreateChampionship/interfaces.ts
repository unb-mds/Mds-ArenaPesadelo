export interface IForm {
  date: string;
  from: string;
  name: string;
  modality: number;
  location: string;
  participants: number;
  to?: string;
  description?: string;
  locationLat?: number;
  locationLng?: number;
}
