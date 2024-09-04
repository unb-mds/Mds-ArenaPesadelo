export interface IEditTeamMember {
  name: string;
  registration: string;
}

interface ITeam {
  modality: number;
  name: string;
}

export interface ITeamMember {
  id: string;
  name: string;
  registration: string;
  team: ITeam;
}
