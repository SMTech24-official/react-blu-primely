// tournamentApi.ts
import { TournamentData } from "../../../components/newBracket/types/tournament";
import { baseApi } from "../baseApi";

export interface Tournament {
  id: string;
  userId: string;
  title: string;
  subtitle?: string;
  description: string;
  gameName: string;
  tournamentType: string;
  participationType: "SOLO" | "TEAM";
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
  status: "ACTIVE" | "CANCEL" | "UPCOMING";
  enrolled: number;
  createdAt: string;
  updatedAt: string;
  participants: participants[];
}

export interface participants {
  name: string;
  image: string | null;
  participantType: string;
  joinedAt: string;
}

interface TournamentResponse {
  success: boolean;
  message: string;
  data: Tournament;
}

interface TournamentListResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: Tournament[];
}

interface CreateTournamentRequest {
  title: string;
  subtitle?: string;
  description: string;
  gameName: string;
  tournamentType: string;
  participationType: "SOLO" | "TEAM";
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
  image?: File;
}

interface BracketResponse {
  success: boolean;
  message: string;
  data: TournamentData;
}

interface ParticipantResponse {
  success: boolean;
  message: string;
  data: ParticipantData;
}

type ParticipantData = {
  id: string;
  tournamentId: string;
  userId: string;
  clanId: string | null;
  createdAt: string; // or Date
  updatedAt: string; // or Date
};

interface UpdateTournamentRequest extends Partial<CreateTournamentRequest> {
  id: string;
}

export const tournamentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTournament: builder.mutation<TournamentResponse, FormData>({
      query: (formData) => ({
        url: "/tournament/create",
        method: "POST",
        body: formData,
      }),
    }),

    getTournaments: builder.query<
      TournamentListResponse,
      {
        page?: number;
        limit?: number;
        search?: string;
        gameName?: string;
        region?: string;
        status?: string;
      }
    >({
      query: (params) => ({
        url: "/tournament",
        method: "GET",
        params,
      }),
    }),

    getTournamentById: builder.query<TournamentResponse, string>({
      query: (id) => {
        return `/tournament/${id}`;
      },
    }),

    updateTournament: builder.mutation<
      TournamentResponse,
      UpdateTournamentRequest
    >({
      query: ({ id, ...body }) => ({
        url: `/tournament/${id}`,
        method: "PUT",
        body,
      }),
    }),

    deleteTournament: builder.mutation<TournamentResponse, string>({
      query: (id) => ({
        url: `/tournament/${id}`,
        method: "DELETE",
      }),
    }),
    getTournamentsFixture: builder.query<
      BracketResponse,
      {
        id: string;
      }
    >({
      query: (id) => ({
        url: `/match/bracket/${id.id}`,
        method: "GET",
      }),
    }),
    joinTournaments: builder.mutation<
      ParticipantResponse,
      { tournamentId: string; userId?: string; clanId?: string }
    >({
      query: (formData) => ({
        url: "/participants/join",
        method: "POST",
        body: formData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateTournamentMutation,
  useGetTournamentsQuery,
  useGetTournamentByIdQuery,
  useUpdateTournamentMutation,
  useDeleteTournamentMutation,
  useGetTournamentsFixtureQuery,
  useJoinTournamentsMutation
} = tournamentApi;
