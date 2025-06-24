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
  team2Id: string | null;
  winnerId: string | null;
  startTime: string;
  status: "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED" | "scheduled";
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

interface GenerateMatchesResponse {
  success: boolean;
  message: string;
  data: {
    count: number;
  };
}

interface UpdateMatchWinnerResponse {
  success: boolean;
  message: string;
  data: Match;
}

interface ErrorResponse {
  success: false;
  message: string;
  errorMessages: Array<{
    path: string;
    message: string;
  }>;
  err: {
    statusCode: number;
  };
  stack?: string;
}

type UpdateMatchWinnerApiResponse = UpdateMatchWinnerResponse | ErrorResponse;

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
      providesTags: ["Matches"],
    }),
    generateMatches: builder.mutation<
      GenerateMatchesResponse,
      { tournamentId: string }
    >({
      query: ({ tournamentId }) => ({
        url: `match/generate/${tournamentId}`,
        method: "POST",
      }),
      invalidatesTags: ["Matches"],
    }),
    updateMatchWinner: builder.mutation<
      UpdateMatchWinnerApiResponse,
      { matchId: string; winnerId: string }
    >({
      query: ({ matchId, winnerId }) => ({
        url: `match/${matchId}`,
        method: "PUT",
        body: {
          winnerId,
        },
      }),
      invalidatesTags: ["Matches", "Tournments"], // Invalidate matches cache after updating winner
    }),
  }),
});

export const {
  useGetRecentMatchQuery,
  useGenerateMatchesMutation,
  useUpdateMatchWinnerMutation,
} = matchApi;
