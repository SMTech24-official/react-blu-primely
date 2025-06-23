import { ClanMember2, TAward } from "../redux/types";

export type NavPropsTypes = {
  name: string;
  link: string;
};

export interface TournamentProps {
  imageSrc: string;
  id: string;
  title: string;
  subtitle?: string;
  prize: number;
  maxTeams?: number;
  enrolledTeams?: number;
  description?: string;
  date: string;
  entryFee: number;
  teamSize: number;
  regions: string;
  game?: string;
  skillLevel: string;
  platform?: string;
  rules?: string;
  badge?: boolean;
  tournamentType?: string;
  status?: "CANCEL" | "ACTIVE" | "UPCOMING";
  handleGenerateMatches?: (tournamentId: string) => void;
  handleDelete?: (id: string) => void;
}

export interface PrimalChampionshipCardProps {
  title: string;
  image: string;
  prize: {
    totalPrize: number;
    firstPrize: number;
    secondPrize: number;
    thirdPrize: number;
  };
  description?: string;
  subtitle?: string;
  battleground: string;
  teamSize: string;
  maxTeams: number;
  enrolled: number;
  startingTime: string;
  thumbnailUrl: string;
  onView?: () => void;
  registrationStatus: boolean;
  enrollmentStatus: boolean;
  entryFee: number;
  regions: string;
  date: string;
  skillLevel: string;
  game: string;
  platform: string;
  enrolledTeams: number;
}

export interface TournamentDetails {
  entryFee: number;
  format: string;
  battleground: string;
  regions: string[];
  entryCredits: number;
  teamSize: string;
  maxTeams: number;
  enrolled: number;
  registrationStatus: string;
  startingTime: string;
  imageUrl: string;
}

export interface TournamentBannerProps {
  bannerImage: string;
  title: string;
  subtitle: string;
  gameName: string;
  tournamentType: string;
  platform: string;
  startDate: string;
  registrationStatus: boolean;
  enrollmentStatus: boolean;
  entryFee: string | number;
  teamSize: number;
  maxTeams: number;
  enrolledTeams: number;
  skillLevel: string;
  handleEnroll?: () => void;
  // setShowConfetti: Dispatch<SetStateAction<boolean>>;
}

export interface Player {
  name: string;
  discordId: string;
  avatar: string;
}

export interface ClanCardProps {
  teamName: string;
  teamLogo: string;
  players?: ClanMember2[];
  id?: string;
  onViewDetails?: () => void;
  onToggleRoster?: () => void;
  isRosterHidden?: boolean;
}

export interface ClanFormData {
  mission: string;
  values: string;
}

export interface Player {
  name: string;
  discordId: string;
  avatar: string;
}

export interface MatchCardProps {
  opponent: string;
  date: string;
  result: string;
  image: string;
}

export type AwardType = "mvp" | "strategy" | "comeback" | "teamwork";

export interface AwardData {
  image: string;
  title: string;
  description: string;
}

export type Teams = {
  teamName: string;
  teamLogo: string;
  players: {
    name: string;
    discordId: string;
    avatar: string;
  }[];
};

// export interface CommunicationProps {
//   message: string;
//   userRole: string;
//   messages: Messages[];
//   setMessages: React.Dispatch<React.SetStateAction<string>>;
//   handelSend: () => void;
// }

export type FeaturedProps = {
  id?: number;
  feature: string;
  feature2?: string;
  image: string;
  classProps?: string;
};

export interface WeekPlayer {
  rank: number;
  name: string;
  xp: string;
  credits: number;
  avatar: string;
  date: string;
}

export interface ClanTableProps {
  members: {
    id: string;
    avatar: string;
    name: string;
    xp: number;
    earning: number;
    eliteTrophies: number;
    goldTrophies: number;
  }[];
}

export type report = {
  tournments: number;
  players: number;
  revenue: number;
  icon?: boolean;
  subtitle?: boolean;
  cardOneText: string;
  cardTwoText: string;
  cardThreeText: string;
};

export type Transaction = {
  date: string;
  transactionId: string;
  tournamentName: string;
  status: string;
};

export type Trophy = {
  type: string;
  count: number;
};

export type Clan = {
  name: string;
  id: string;
  totalMembers: number;
  tournamentsPlayed: number;
  trophies: Trophy[];
  lostWin: { lost: number; win: number };
  awards: TAward[];
};

// Base types
interface BaseStats {
  id: string;
  totalMatches: number;
  wins: number;
  losses: number;
  winRate: number;
  exp: number;
  eliteTrophies: number;
  goldTrophies: number;
  silverTrophies: number;
  bronzeTrophies: number;
  totalEarnings: number;
  rank: number;
  totalScore: number;
  createdAt: string;
  updatedAt: string;
}

// User types
interface UserProfile {
  id: string;
  fullName: string | null;
  userName: string;
  email: string;
  profilePicture: string | null;
}

// Clan types
interface ClanProfile {
  id: string;
  name: string;
  mission: string;
  logo: string | null;
}

// Leaderboard entry types
interface UserLeaderboardEntry extends BaseStats {
  userId: string;
  user: UserProfile;
  clanId?: never; // Ensure these can't coexist
  clan?: never;
}

interface ClanLeaderboardEntry extends BaseStats {
  clanId: string;
  clan: ClanProfile;
  userId?: never;
  user?: never;
}

// Unified type
export type LeaderboardEntry = UserLeaderboardEntry | ClanLeaderboardEntry;

// API response type
export interface LeaderboardResponse {
  success: boolean;
  message: string;
  data: LeaderboardEntry[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

// Type guards for runtime checking
// function isUserEntry(entry: LeaderboardEntry): entry is UserLeaderboardEntry {
//   return 'user' in entry;
// }

// function isClanEntry(entry: LeaderboardEntry): entry is ClanLeaderboardEntry {
//   return 'clan' in entry;
// }
