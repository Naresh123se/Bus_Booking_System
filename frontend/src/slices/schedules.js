import { apiSlice } from './apiSlice';
const USERS_URL = '/schedule';


export const scheduleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    add: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/add`,
        method: 'POST',
        body: data,
      }),
    }),
    
    edit: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/edit`,
        method: 'POST',
      }),
    }),
    delete: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/delete`,
        method: 'POST',
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useAddMutation,
  useEditMutation,
  useDeleteMutation,
 
} = scheduleApiSlice;
