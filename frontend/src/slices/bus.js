import { apiSlice } from './apiSlice';
const BUSES_URL = '/api';


export const bus = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addbus: builder.mutation({
      query: (data) => ({
        url: `${BUSES_URL}/addbus`,
        method: 'POST',
        body: data,
      }),
    }),

    getbus: builder.mutation({
      query: () => ({
        url: `${BUSES_URL}/getbus`, // Remove body field for GET request
        method: 'GET',
      }),
    }),

    totalBuses: builder.mutation({
      query: () => ({
        url: `${BUSES_URL}/totalBuses`, // Remove body field for GET request
        method: 'GET',
      }),
    }),

    editbus: builder.mutation({
      query: ({ id, data }) => ({
        url: `${BUSES_URL}/editbus/${id}`,
        method: 'PUT',
        body: data, // Include data in the request body
      }),
    }),
    
    deletebus: builder.mutation({
      query: (id) => ({
        url: `${BUSES_URL}/delete/${id}`,
        method: 'DELETE',
      }),
    }),
    
  }),
});

export const {
  useAddbusMutation,
  useGetbusMutation,
  useEditbusMutation,
  useDeletebusMutation,
  useTotalBusesMutation,
} = bus;

