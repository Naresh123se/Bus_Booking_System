import { apiSlice } from './apiSlice';

const API_URL = '/api'; // Adjust the URL to include the '/api' prefix

export const khalti = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    InitiatePayment: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/khalti`,
        method: 'POST',
        body: data,
      }),
    }),


    Confirmation: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/khalti_com`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useInitiatePaymentMutation,
  useConfirmationMutation,
} = khalti;
