import { baseApi } from "../baseApi";

interface Tournament {
  title: string;
  gameName: string;
  tournamentType: string;
  participationType: "SOLO" | "TEAM";
  gamePlatform: string;
  startDate: string;
  prizePool: number;
  entryFee: number;
  teamSize: number;
  region: string;
  skillLevel: string;
  image: string;
}

interface Opponent {
  id: string;
  fullName: string | null;
  profilePicture: string | null;
}

interface Match {
  id: string;
  tournamentId: string;
  team1Id: string;
  team2Id: string;
  winnerId: string | null;
  startTime: string;
  status: "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";
  round: string;
  createdAt: string;
  updatedAt: string;
  tournament: Tournament;
  opponent: Opponent;
}

interface MatchArrayResponse {
  success: boolean;
  message: string;
  data: Match[];
}

interface MatchGroupedResponse {
  success: boolean;
  message: string;
  data: {
    upcoming: Match[];
    recent: Match[];
  };
}

type MatchResponse = MatchArrayResponse | MatchGroupedResponse;

interface MatchQueryParams {
  matchType?: "recent" | "upcoming" | "completed";
}

export const matchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecentMatch: builder.query<MatchResponse, MatchQueryParams>({
      query: (params) => ({
        url: "match/user-match",
        method: "GET",
        params: {
          matchType: params.matchType,
        },
      }),
      providesTags: ["Matches"], // Updated tag for cache invalidation
    }),
  }),
});

export const { useGetRecentMatchQuery } = matchApi;
