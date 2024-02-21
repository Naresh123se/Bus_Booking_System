import { apiSlice } from './apiSlice';

const USERS_URL = '/api/Booking'; // Adjust the URL to include the '/api' prefix

export const booking = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    search: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/dire`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useSearchMutation,
} = booking;
