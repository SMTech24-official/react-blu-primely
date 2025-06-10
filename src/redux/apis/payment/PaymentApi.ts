import { baseApi } from "../baseApi";

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
  tournamentName?: string;
}

interface MetaData {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

interface PaymentApiResponse {
  success: boolean;
  message: string;
  data: {
    metaData: MetaData;
    payments: Payment[];
  };
}

interface PaymentQueryParams {
  page?: number;
  limit?: number;
}

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPayments: builder.query<PaymentApiResponse, PaymentQueryParams>({
      query: (params) => ({
        url: "/payment",
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
        },
      }),
      providesTags: ["Payment"],
    }),
    initiatePayment: builder.mutation({
      query: ({ paymentData }) => ({
        url: `/payment/initiate`,
        method: "POST",
        body: paymentData,
      }),
      invalidatesTags: ["Payment"],
    }),
  }),
});

export const { useGetAllPaymentsQuery, useInitiatePaymentMutation } =
  paymentApi;
