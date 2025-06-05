import { baseApi } from "../baseApi";

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMessageMembers: builder.query<MessageMembersResponse, void>({
      query: () => "/message/members",
      providesTags: ["MessageMembers"],
    }),
    getMessageById: builder.query<MessageByIdResponse, string>({
      query: (id) => `/message/${id}`,
      providesTags: ["MessageMembers"],
    }),
  }),
});

export const { useGetMessageMembersQuery, useGetMessageByIdQuery } = chatApi;

// Types
interface MessageMembersResponse {
  success: boolean;
  message: string;
  data: MessageMember[];
}

interface MessageByIdResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    isGroup: boolean;
    logo: string | null;
    createdAt: string;
    updatedAt: string;
    users: Array<{
      role: "LEADER" | "MEMBER";
      user: {
        id: string;
        fullName: string | null;
        userName: string;
        email: string;
        profilePicture: string;
      };
    }>;
    messages: Messages[];
  };
}

export interface Messages {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MessageMember {
  id: string;
  name: string;
  isGroup: boolean;
  logo: string | null;
  createdAt: string;
  updatedAt: string;
  lastMessage: LastMessage | null;
  unreadCount: number;
}

interface LastMessage {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}
