export interface IResult {
  rank: string;
  team_name: string;
  wins: string;
  draws: string;
  losses: string;
  goals_for: string;
  goals_against: string;
  points: string;
}

interface ITeam {
  id: string;
  name: string;
}

export interface IChampionship {
  id: string;
  name: string;
  participants: number;
  date: string;
  from: string;
  location: string;
}

export interface IGame {
  id: string;
  home_score: number;
  visitor_score: number;
  host: ITeam | null;
  visiting: ITeam | null;
  phase: number;
}
