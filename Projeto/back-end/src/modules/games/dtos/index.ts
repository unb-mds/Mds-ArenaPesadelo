export interface IGamesDTO {
  home?: string | null;
  visitor?: string | null;
  cardinal: number;
  phase: number;
  championshipId: string;
  homeScore?: number;
  visitorScore?: number;
}
