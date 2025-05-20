export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
  };
}

export interface UserProfile {
  id: string;
  fullName: string;
  userName: string;
  email: string;
  role: string;
  profilePicture?: string | null;
  coverPicture?: string | null;
  isOnline: boolean;
  createdAt: string;
}

export interface RegisterRequest {
  fullName?: string;
  userName: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    message: string;
  };
}

// Clan types
export interface ClanMember {
  role: string;
  user: UserProfile;
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


export type TAward = {
  id: string;
  clanId: string;
  name: string; // assuming this is an enum value like "TEAMWORK"
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

export interface Clan {
  id: string;
  userId: string;
  name: string;
  mission: string;
  values: string;
  createdAt: string;
  updatedAt: string;
  ClanMember: ClanMember[];
  ClanStats: ClanStats;
  Award: TAward[]
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
