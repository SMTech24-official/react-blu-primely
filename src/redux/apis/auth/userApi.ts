import { UserProfile } from "../../types";
import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query<{ success: boolean; data: UserProfile }, string>(
      {
        query: (id) => `/user/${id}`,
      }
    ),

    getAllUsers: builder.query<{ success: boolean; data: UserProfile[] }, void>(
      {
        query: () => "/user",
      }
    ),

    updateUser: builder.mutation<
      { success: boolean; message: string },
      { userName: string }
    >({
      query: (body) => ({
        url: "/user/update-me",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} = userApi;
