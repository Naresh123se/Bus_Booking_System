import { apiSlice } from './apiSlice';

const USERS_URL = '/api'; // Adjust the URL to include the '/api' prefix

export const seat = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    seat: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/seat`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useSeatMutation,
} = seat;
