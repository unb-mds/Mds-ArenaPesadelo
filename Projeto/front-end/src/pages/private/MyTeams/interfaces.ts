export interface ITeam {
  id: string;
  name: string;
}

export interface ITeamMember {
  id: string;
  name: string;
  registration: string;
}

export interface IAddTeamMemberForm {
  name: string;
  registration: string;
}
