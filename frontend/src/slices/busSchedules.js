import { apiSlice } from './apiSlice';
const SCHEDULES_URL = '/api/';


export const busSchedules = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    add: builder.mutation({
      query: (data) => ({
        url: `${SCHEDULES_URL}/add`,
        method: 'POST',
        body: data,
      }),
    }),

    getSchedule: builder.mutation({
      query: () => ({
        url: `${SCHEDULES_URL}getschedule`, // Remove body field for GET request
        method: 'GET',
      }),
    }),

    totalSchedules: builder.mutation({
      query: () => ({
        url: `${SCHEDULES_URL}/totalSchedules`, // Remove body field for GET request
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
        url: `${SCHEDULES_URL}/delete1/${id}`,
        method: 'DELETE',
      }),
    }),
    
  }),
});

export const {
  useAddMutation,
  useGetScheduleMutation,
  useEditScheduleMutation,
  useDeleteScheduleMutation,
  useTotalSchedulesMutation,
} = busSchedules;

