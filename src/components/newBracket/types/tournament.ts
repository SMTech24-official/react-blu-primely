export interface Team {
  name: string;
  image: string | null;
  fullName: string;
  email: string;
}

export interface Match {
  id: string;
  tournamentId: string;
  team1Id: string;
  team2Id: string;
  winnerId: string | null;
  startTime: string;
  status: "completed" | "upcoming" | "in_progress";
  round: string;
  createdAt: string;
  updatedAt: string;
  team1: Team;
  team2: Team;
}

export interface TournamentData {
  [round: string]: Match[];
}

export interface MatchCardProps {
  match: Match;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

export interface RoundColumnProps {
  round: string;
  matches: Match[];
  onMatchClick: (match: Match) => void;
}

export interface TournamentBracketProps {
  data: TournamentData;
  admin: boolean;
}

export interface TeamDisplayProps {
  team: Team;
  isWinner: boolean;
}

export interface MatchDetailsProps {
  match: Match | null;
  onClose: () => void;
  handleWinner: (matchId: string, winnerId: string) => void;
  winnerState: string;
  setWinner: React.Dispatch<React.SetStateAction<string | null>>;
}
