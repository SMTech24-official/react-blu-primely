
import { baseApi } from "../baseApi";
import {
//   BaseApiResponse,
  CreateTournamentRequest,
  GetTournamentsRequest,
  Tournament,
  // TournamentResponse,
  TournamentsListResponse,
  UpdateTournamentRequest,
} from "../../../types/clanAndInviteTypes";

export const tournamentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create tournament
    createTournament: builder.mutation<Tournament, CreateTournamentRequest>({
      query: (body) => {
        const formData = new FormData();
        Object.entries(body).forEach(([key, value]) => {
          if (value !== undefined) {
            if (
              (typeof File !== "undefined" && value instanceof File) ||
              (typeof Blob !== "undefined" && value instanceof Blob)
            ) {
              formData.append(key, value);
            } else {
              formData.append(key, String(value));
            }
          }
        });
        return {
          url: "/tournament/create",
          method: "POST",
          body: formData,
          formData: true,
        };
      },
    }),

    // Get single tournament
    getTournament: builder.query<Tournament, string>({
      query: (id) => ({
        url: `/tournament/${id}`,
      }),
    }),

    // Get all tournaments
    getTournaments: builder.query<TournamentsListResponse, GetTournamentsRequest>({
      query: ({ page = 1, limit = 10, ...params }) => ({
        url: "/tournament",
        params: {
          page,
          limit,
          ...params,
        },
      }),
    }),

    // Update tournament
    updateTournament: builder.mutation<Tournament, UpdateTournamentRequest>({
      query: ({ id, ...body }) => {
        const formData = new FormData();
        Object.entries(body).forEach(([key, value]) => {
          if (value !== undefined) {
            if (
              (typeof File !== "undefined" && value instanceof File) ||
              (typeof Blob !== "undefined" && value instanceof Blob)
            ) {
              formData.append(key, value);
            } else {
              formData.append(key, String(value));
            }
          }
        });
        return {
          url: `/tournament/${id}`,
          method: "PATCH",
          body: formData,
          formData: true,
        };
      },
    }),

    // Delete tournament
    deleteTournament: builder.mutation<Tournament, string>({
      query: (id) => ({
        url: `/tournament/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateTournamentMutation,
  useGetTournamentQuery,
  useGetTournamentsQuery,
  useUpdateTournamentMutation,
  useDeleteTournamentMutation,
} = tournamentApi;