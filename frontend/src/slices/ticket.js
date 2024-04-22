import { apiSlice } from './apiSlice';

const USERS_URL = '/api'; // Adjust the URL to include the '/api' prefix

export const ticket = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    Ticket: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/create`,
        method: 'POST',
        body: data,
      }),
    }),

    getTicket: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/getTicket`,
        method: 'GET',
        body: data,
      }),
    }),
   
  }),
});

export const {
  useTicketMutation,
  useGetTicketMutation,

} = ticket;