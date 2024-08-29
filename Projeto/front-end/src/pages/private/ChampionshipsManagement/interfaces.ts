export interface IChampionship {
  id: string;
  name: string;
  modality: string;
  location: string;
  participants: string;
  description: string | null;
  location_lat: string | null;
  location_lng: string | null;
  date: string;
  from: string;
  to: string;
  photo_url?: string;
}

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

