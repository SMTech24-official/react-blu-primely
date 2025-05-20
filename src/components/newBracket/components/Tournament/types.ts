// Type definitions for tournament data
export interface Team {
  id: string;
  name: string;
  score?: number;
  seed?: number;
  logo?: string;
  wins?: number;
  losses?: number;
}

export interface Match {
  id: string;
  teams: [Team | null, Team | null];
  winner?: string; // ID of winning team
  nextMatchId?: string; // ID of the match that the winner advances to
  status?: "upcoming" | "inProgress" | "completed";
}

export interface Round {
  id: string;
  name: string;
  matches: Match[];
}

export interface TournamentData {
  id: string;
  name: string;
  rounds: Round[];
}

export interface BracketProps {
  tournament: TournamentData;
  onMatchClick?: (matchId: string) => void;
}

export interface RoundProps {
  round: Round;
  roundIndex: number;
  highlightedMatchId: string | null;
  setHighlightedMatchId: (id: string | null) => void;
  onMatchClick?: (matchId: string) => void;
}

export interface MatchProps {
  match: Match;
  roundIndex: number;
  matchIndex: number;
  isHighlighted: boolean;
  setHighlightedMatchId: (id: string | null) => void;
  onMatchClick?: (matchId: string) => void;
}

export interface TeamProps {
  team: Team | null;
  isWinner: boolean;
  matchStatus?: "upcoming" | "inProgress" | "completed";
}

export interface ConnectionLinesProps {
  tournament: TournamentData;
  highlightedMatchId: string | null;
}

export interface ConnectionProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isHighlighted: boolean;
  matchId: string;
}
