import { apiSlice } from './apiSlice';
const BLOG_URL = '/api';


export const blog = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addBlog: builder.mutation({
      query: (data) => ({
        url: `${BLOG_URL}/addBlog`,
        method: 'POST',
        body: data,
      }),
    }),

    getBlog: builder.mutation({
      query: () => ({
        url: `${BLOG_URL}/getBlog`, // Remove body field for GET request
        method: 'GET',
      }),
    }),

    editBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `${BLOG_URL}/editBlog/${id}`,
        method: 'PUT',
        body: data, // Include data in the request body
      }),
    }),
    
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `${BLOG_URL}/deleteBlog/${id}`,
        method: 'DELETE',
      }),
    }),
    
  }),
});

export const {
  useAddBlogMutation,
  useGetBlogMutation,
  useEditBlogMutation,
  useDeleteBlogMutation,
} = blog;

