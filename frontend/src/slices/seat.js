import { apiSlice } from './apiSlice';

const USERS_URL = '/api'; // Adjust the URL to include the '/api' prefix

export const seat = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    Selseat: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/seat`,
        method: 'POST',
        body: data,
      }),
    }),

    Getseat: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/getseat`,
        method: 'GET',
        body: data,
      }),
    }),
  }),
});

export const {
  useSelseatMutation,
  useGetseatMutation,
} = seat;