import {
  ClanCreateRequest,
  ClanCreateResponse,
  ClanListResponse,
  ClanUpdateRequest,
  ClanUpdateResponse,
  ClanDeleteResponse,
  ClanDetailResponse,
  ClanByUserResponse,
} from "../../types";
import { baseApi } from "../baseApi";

export const clanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get list of clans
    getClans: builder.query<ClanListResponse, void>({
      query: () => "/clan",
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Clan" as const, id })),
              { type: "Clan", id: "LIST" },
            ]
          : [{ type: "Clan", id: "LIST" }],
    }),
    getClansByUser: builder.query<ClanByUserResponse, void>({
      query: () => "/clan/user",
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Clan" as const, id })),
              { type: "Clan", id: "LIST" },
            ]
          : [{ type: "Clan", id: "LIST" }],
    }),

    // Create a new clan
    createClan: builder.mutation<ClanCreateResponse, ClanCreateRequest>({
      query: (body) => ({
        url: "/clan/create",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Clan", id: "LIST" }],
    }),

    // Get clan details by ID
    getClanById: builder.query<ClanDetailResponse, string>({
      query: (id) => `/clan/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Clan", id }],
    }),

    // Update clan by ID
    updateClan: builder.mutation<
      ClanUpdateResponse,
      { id: string; data: ClanUpdateRequest }
    >({
      query: ({ id, data }) => ({
        url: `/clan/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Clan", id },
        { type: "Clan", id: "LIST" },
      ],
    }),

    // Delete clan by ID
    deleteClan: builder.mutation<ClanDeleteResponse, string>({
      query: (id) => ({
        url: `/clan/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Clan", id },
        { type: "Clan", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetClansQuery,
  useGetClansByUserQuery,
  useCreateClanMutation,
  useGetClanByIdQuery,
  useUpdateClanMutation,
  useDeleteClanMutation,
} = clanApi;
