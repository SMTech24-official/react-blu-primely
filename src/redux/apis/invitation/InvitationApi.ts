/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseApiResponse,
  CreateInvitationRequest,
  CreateInvitationResponse,
  ErrorResponse,
  GetUserInvitationsRequest,
  Invitation,
  Meta,
  UpdateInvitationResponse,
  UserInvitationsResponse,
} from "../../../types/clanAndInviteTypes";
import { baseApi } from "../baseApi";

// Helper type for transformed response
interface TransformedUserInvitationsResponse {
  meta: Meta;
  invitations: Invitation[];
}

// Type for RTK Query's error response
interface RtkQueryError {
  status: number;
  data?: {
    message?: string;
    errorMessages?: Array<{ path: string; message: string }>;
    err?: {
      issues: Array<{
        received: string;
        code: string;
        options: string[];
        path: string[];
        message: string;
      }>;
      name: string;
    };
    [key: string]: unknown;
  };
}

// Error transformer function
const transformRtkError = (error: RtkQueryError | unknown): ErrorResponse => {
  if (typeof error === "object" && error !== null && "status" in error) {
    const rtkError = error as RtkQueryError;
    return {
      success: false,
      message: rtkError.data?.message || "Unknown error",
      errorMessages: rtkError.data?.errorMessages || [],
      err: rtkError.data?.err || { issues: [], name: "UnknownError" },
      ...rtkError.data,
    };
  }
  return {
    success: false,
    message: "Unknown error occurred",
    errorMessages: [],
    err: { issues: [], name: "UnknownError" },
  };
};

export const invitationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create new invitation
    createInvitation: builder.mutation<
      BaseApiResponse<CreateInvitationResponse>,
      CreateInvitationRequest
    >({
      query: (body) => ({
        url: "/clan-invitation/invite",
        method: "POST",
        body,
      }),
      transformErrorResponse: transformRtkError,
      invalidatesTags: ["Invitations"],
    }),

    // Get user's invitations
    getUserInvitations: builder.query<
      BaseApiResponse<TransformedUserInvitationsResponse>,
      GetUserInvitationsRequest
    >({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/clan-invitation/user",
        params: { page, limit },
      }),
      transformResponse: (
        response: BaseApiResponse<UserInvitationsResponse>
      ): BaseApiResponse<TransformedUserInvitationsResponse> => ({
        ...response,
        data: {
          meta: response.data.meta,
          invitations: response.data.data,
        },
      }),
      transformErrorResponse: transformRtkError,
    }),

    // Update invitation status
    updateInvitation: builder.mutation<
      BaseApiResponse<UpdateInvitationResponse>,
      { id: string; status: "ACCEPTED" | "REJECTED" }
    >({
      query: ({ id, status }) => ({
        url: `/clan-invitation/${id}`,
        method: "PUT",
        body: { status: status },
      }),
      transformErrorResponse: transformRtkError,
    }),
    isInvited: builder.query<any, { clanId: string; userId: string }>({
      query: (params) => ({
        url: "/clan-invitation/isClanMember",
        method: "GET",
        params: {
          clanId: params.clanId,
          userId: params.userId,
        },
      }),
      providesTags: ["Invitations"], // Updated tag for cache invalidation
    }),
  }),
});

export const {
  useCreateInvitationMutation,
  useGetUserInvitationsQuery,
  useUpdateInvitationMutation,
  useIsInvitedQuery,
} = invitationApi;
