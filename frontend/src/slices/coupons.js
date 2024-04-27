import { apiSlice } from "./apiSlice";
const COUPONS_URL = "/api";

export const coupons = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCoupons: builder.mutation({
      query: (data) => ({
        url: `${COUPONS_URL}/addCoupons`,
        method: "POST",
        body: data,
      }),
    }),

    getCoupons: builder.mutation({
      query: () => ({
        url: `${COUPONS_URL}/getCoupons`,
        method: "GET",
      }),
    }),

    editCoupons: builder.mutation({
      query: ({ id, data }) => ({
        url: `${COUPONS_URL}/editCoupons/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteCoupons: builder.mutation({
      query: (id) => ({
        url: `${COUPONS_URL}/deleteCoupons/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddCouponsMutation,
  useGetCouponsMutation,
  useEditCouponsMutation,
  useDeleteCouponsMutation,
  
} = coupons;
