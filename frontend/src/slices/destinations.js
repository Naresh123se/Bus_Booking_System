import { apiSlice } from './apiSlice';
const SCHEDULES_URL = '/api';


export const bus = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addDecc: builder.mutation({
      query: (data) => ({
        url: `${SCHEDULES_URL}/addDes`,
        method: 'POST',
        body: data,
      }),
    }),

    getDess: builder.mutation({
      query: () => ({
        url: `${SCHEDULES_URL}/getDes`, // Remove body field for GET request
        method: 'GET',
      }),
    }),

    editbus: builder.mutation({
      query: ({ id, data }) => ({
        url: `${SCHEDULES_URL}/editbus/${id}`,
        method: 'PUT',
        body: data, // Include data in the request body
      }),
    }),
    
    deletebus: builder.mutation({
      query: (id) => ({
        url: `${SCHEDULES_URL}/delete/${id}`,
        method: 'DELETE',
      }),
    }),
    
  }),
});

export const {
  useAddDeccMutation,
  useGetDessMutation,
  useEditbusMutation,
  useDeletebusMutation,
} = bus;

