export interface IRegistrationModal {
  championshipId: string;
  shown: boolean;
  onDismiss(): void;
}

export interface ITeam {
  id: string;
  name: string;
}

export interface IChampionship {
  id: string;
  name: string;
}
