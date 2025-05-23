
import { baseApi } from "../baseApi";


export const tournamentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create tournament
    giveAward: builder.mutation({
      query: (body) => {
        return {
          url: "/award/give",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Clan", "Award"],
    }),

    // Delete tournament
    withdrawAward: builder.mutation({
      query: (id) => ({
        url: `/award/withdraw/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Clan", "Award"],
    }),
  }),
});

export const {
  useGiveAwardMutation,
  useWithdrawAwardMutation
} = tournamentApi;