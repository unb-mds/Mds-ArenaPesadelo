export interface ITeamMemberForm {
  name: string;
  registration: string;
  editing?: boolean;
}

export interface ITeamMember {
  id: string;
  name: string;
  registration: string;
}

export type IEditTeamMemberForm = Array<{
  id: string;
  name: string;
  registration: string;
}>;

export interface INewTeamForm {
  name: string;
  modality: number;
}
