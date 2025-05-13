// tournamentApi.ts
import { baseApi } from '../baseApi';

interface Tournament {
  id: string;
  userId: string;
  title: string;
  subtitle?: string;
  description: string;
  gameName: string;
  tournamentType: string;
  participationType: 'SOLO' | 'TEAM';
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
  enrolled?: number;
  createdAt: string;
  updatedAt: string;
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
  participationType: 'SOLO' | 'TEAM';
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

interface UpdateTournamentRequest extends Partial<CreateTournamentRequest> {
  id: string;
}

export const tournamentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTournament: builder.mutation<TournamentResponse, FormData>({
      query: (formData) => ({
        url: '/tournament/create',
        method: 'POST',
        body: formData,
      }),
    }),

    getTournaments: builder.query<TournamentListResponse, {
      page?: number;
      limit?: number;
      search?: string;
      gameName?: string;
      region?: string;
    }>({
      query: (params) => ({
        url: '/tournament',
        method: 'GET',
        params,
      }),
    }),

    getTournamentById: builder.query<TournamentResponse, string>({
      query: (id) => `/tournament/${id}`,
   
    }),

    updateTournament: builder.mutation<TournamentResponse, UpdateTournamentRequest>({
      query: ({ id, ...body }) => ({
        url: `/tournament/${id}`,
        method: 'PUT',
        body,
      }),

    }),

    deleteTournament: builder.mutation<TournamentResponse, string>({
      query: (id) => ({
        url: `/tournament/${id}`,
        method: 'DELETE',
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
} = tournamentApi;