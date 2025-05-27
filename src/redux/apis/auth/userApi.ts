import { UserProfile } from "../../types";
import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query<{ success: boolean; data: UserProfile }, string>(
      {
        query: (id) => `/user/${id}`,
        providesTags: ["User"],
      }
    ),

    getAllUsers: builder.query<{ success: boolean; data: UserProfile[] }, void>(
      {
        query: () => "/user",
        providesTags: ["User"],
      }
    ),

    updateUser: builder.mutation<
      { success: boolean; message: string },
      FormData | { userName: string }
    >({
      query: (body) => ({
        url: "/user/update-me",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    createGameEntries: builder.mutation<
      { success: boolean; message: string; data: { count: number } },
      Array<{ gameName: string; gameId: string }>
    >({
      query: (body) => ({
        url: "/game-entry/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["GameEntries"],
    }),

    getUserGameEntries: builder.query<
      {
        success: boolean;
        message: string;
        meta: {
          page: number;
          limit: number;
          total: number;
          totalPage: number;
        };
        data: Array<{
          id: string;
          userId: string;
          gameName: string;
          gameId: string;
          createdAt: string;
          updatedAt: string;
          user: UserProfile;
        }>;
      },
      void
    >({
      query: () => "/game-entry/user",
      providesTags: ["GameEntries"],
    }),

    updateGameEntry: builder.mutation<
      {
        success: boolean;
        message: string;
        data: {
          id: string;
          userId: string;
          gameName: string;
          gameId: string;
          createdAt: string;
          updatedAt: string;
        };
      },
      { id: string; body: { gameName: string; gameId: string } }
    >({
      query: ({ id, body }) => ({
        url: `/game-entry/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["GameEntries"],
    }),

    deleteGameEntry: builder.mutation<
      {
        success: boolean;
        message: string;
        data: {
          id: string;
          userId: string;
          gameName: string;
          gameId: string;
          createdAt: string;
          updatedAt: string;
        };
      },
      string
    >({
      query: (id) => ({
        url: `/game-entry/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GameEntries"],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useCreateGameEntriesMutation,
  useGetUserGameEntriesQuery,
  useUpdateGameEntryMutation,
  useDeleteGameEntryMutation,
} = userApi;
