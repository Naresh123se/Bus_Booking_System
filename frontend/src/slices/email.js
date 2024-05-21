import { apiSlice } from './apiSlice';

const EMAIL_URL = '/api'; // Adjust the URL to include the '/api' prefix

export const email = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    cancelMail: builder.mutation({
        query: (data) => ({
          url: `${EMAIL_URL}/cancelMail`,
          method: 'POST',
          body: data,
        }),
      }),

    cancel: builder.mutation({
        query: (id) => ({
          url: `${EMAIL_URL}/cancel/${id}`,
          method: 'DELETE',
        }),
      }),

  }),
});

export const {
//   useInitiatePaymentMutation,
  useCancelMailMutation,
  useCancelMutation,
//   useConfirmationMutation,
} = email;
