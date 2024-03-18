import { apiSlice } from './apiSlice';
const SCHEDULES_URL = '/api';


export const bus = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addbus: builder.mutation({
      query: (data) => ({
        url: `${SCHEDULES_URL}/addbus`,
        method: 'POST',
        body: data,
      }),
    }),

    getbus: builder.mutation({
      query: () => ({
        url: `${SCHEDULES_URL}/getbus`, // Remove body field for GET request
        method: 'GET',
      }),
    }),

    editSchedule: builder.mutation({
      query: ({ id, data }) => ({
        url: `${SCHEDULES_URL}/edit/${id}`,
        method: 'PUT',
        body: data, // Include data in the request body
      }),
    }),
    
    deleteSchedule: builder.mutation({
      query: (id) => ({
        url: `${SCHEDULES_URL}/delete/${id}`,
        method: 'DELETE',
      }),
    }),
    
  }),
});

export const {
  useAddbusMutation,
  useGetbusMutation,
  useEditScheduleMutation,
  useDeleteScheduleMutation,
} = bus;

