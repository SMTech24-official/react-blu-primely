// Clan types
export interface ClanMember {
  role: string;
  user: {
    id: string;
    fullName: string;
    userName: string;
    email: string;
    role: string;
    profilePicture: string | null;
    coverPicture: string | null;
  };
}

export interface ClanStats {
 
  id: string;
  clanId: string;
  totalMatches: number;
  wins: number;
  losses: number;
  winRate: number;
  exp: number;
  eliteTrophies: number;
  goldTrophies: number;
  silverTrophies: number;
  bronzeTrophies: number;
  rank: number | null;
  totalScore: number | null;
  createAt: string;
  updateAt: string;
}

export interface Clan {
  id: string;
  clanId?: string;
  userId: string;
  name: string;
  mission: string;
  values: string;
  createdAt: string;
  updatedAt: string;
  ClanMember: ClanMember[];
  ClanStats: ClanStats;
  totalMembers?: number;
  tournamentsPlayed?: number;
  trophies?: {
    type: "Bronze" | "Silver" | "Gold" | "Elite";
    count: number;
  }[];
  lostWin?: {
    lost: number;
    win: number;
  };
  awards?: string[];
}

export interface ClanListResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: Clan[];
}

export interface ClanCreateRequest {
  name: string;
  mission: string;
  values: string;
}

export interface ClanCreateResponse {
  success: boolean;
  message: string;
  data: Omit<Clan, "ClanMember" | "ClanStats">;
}

export interface ClanDetailResponse {
  success: boolean;
  message: string;
  data: Clan;
}

export interface ClanUpdateRequest {
  name: string;
  mission: string;
  values: string;
}

export interface ClanUpdateResponse {
  success: boolean;
  message: string;
  data: Omit<Clan, "ClanMember" | "ClanStats">;
}

export interface ClanDeleteResponse {
  success: boolean;
  message: string;
}

export interface ClanMember2 {
  role: "LEADER" | "MEMBER"; // Assuming these are the possible roles
  user: {
    id: string;
    fullName: string;
    userName: string;
    email: string;
    role: "USER" | "ADMIN"; // Assuming these are the possible roles
    profilePicture: string | null;
    coverPicture: string | null;
  };
}

export interface Clan2 {
  id: string;
  userId: string;
  name: string;
  mission: string;
  values: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  ClanMember: ClanMember2[];
  ClanStats: ClanStats;
}

export interface ClanByUserResponse {
  success: boolean;
  message: string;
  data: Clan2[];
}


// ---------------

// Common Meta Type
export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}
export interface TransformedUserInvitationsResponse {
  meta: Meta;
  invitations: Invitation[];
}
// Invitation Status Enum
export enum InvitationStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

// Single Invitation Type
export interface Invitation {
  id: string;
  userId: string;
  inviterId: string;
  clanId: string;
  status: InvitationStatus;
  createdAt: string;
  updatedAt: string;
}

// Error Message Type
export interface ErrorMessage {
  path: string;
  message: string;
}

// API Response Types
export interface BaseApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface CreateInvitationResponse {
  id: string;
  userId: string;
  inviterId: string;
  clanId: string;
  status: InvitationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface UserInvitationsResponse {
  meta: Meta;
  data: Invitation[];
}

export interface UpdateInvitationResponse {
  message: string;
}

export interface ErrorResponse {
  success: false;
  message: string;
  errorMessages: ErrorMessage[];
  err: {
    issues: Array<{
      received: string;
      code: string;
      options: string[];
      path: string[];
      message: string;
    }>;
    name: string;
  };
  stack?: string;
}

// Request Types
export interface CreateInvitationRequest {
  userId: string;
  clanId: string;
}

export interface UpdateInvitationRequest {
  status: InvitationStatus;
}

export interface GetUserInvitationsRequest {
  page?: number;
  limit?: number;
}


// -----------------

export interface Tournament {
  id: string;
  userId: string;
  title: string;
  subtitle: string;
  description: string;
  gameName: string;
  tournamentType: string;
  startDate: string;
  endDate: string;
  prizePool: number;
  entryFee: number;
  region: string;
  maxTeams: number;
  teamSize: number;
  skillLevel: string;
  gamePlatform: string;
  rules: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  participants?: Array<{
    id: string;
    username: string;
    avatar: string;
  }>;
}

// Request types
export interface CreateTournamentRequest extends Omit<Tournament, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'participants' | 'image'> {
  image?: File;
}

export interface UpdateTournamentRequest extends Partial<CreateTournamentRequest> {
  id: string;
}

export interface GetTournamentsRequest {
  page?: number;
  limit?: number;
  search?: string;
  gameName?: string;
  region?: string;
}

// Response types
export interface BaseApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface TournamentsListResponse {
  data: Tournament[];
  total: number;
  page: number;
  limit: number;
}

// Use BaseApiResponse<{ meta: Meta; data: Tournament[] }> directly instead of TournamentResponse
