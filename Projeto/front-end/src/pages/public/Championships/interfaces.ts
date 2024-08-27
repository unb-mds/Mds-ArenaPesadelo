export interface IChampionship {
  created_at: string;
  date_end: string | null;
  date_start: number;
  description: string | null;
  id: string;
  location: string;
  location_lat: number | null;
  location_lng: number | null;
  modality: number;
  modality_name: string;
  name: string;
  participants: number;
  photo: string;
  photo_url: string;
  updated_at: string;
}
