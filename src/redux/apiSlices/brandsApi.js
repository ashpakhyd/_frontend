import { api } from "./api";

export const brandsApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: ({
        limit = 10,
        page = 1,
        sortField = "createdAt",
        sortOrder = "DESC",
        filterBy,
        filterValue,
        search = "",
      }) => ({
        url: `/brand/getBrandsList?limit=${limit}&page=${page}&sortField=${sortField}&sortOrder=${sortOrder}&filterBy=${filterBy}&filterValue=${filterValue}&search=${search}`,
      }),
      providesTags: ["brands"],
    }),
    createBrand: builder.mutation({
      query: (body) => ({
        url: `/brand/createBrand`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["brands"],
    }),
    updateBrands: builder.mutation({
      query: (body) => ({
        url: `/brand/updateBrand`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["brands"],
    }),
    updateBrandStatus: builder.mutation({
      query: (body) => ({
        url: `/brand/updateBrandStatus`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["brands"],
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useCreateBrandMutation,
  useUpdateBrandsMutation,
  useUpdateBrandStatusMutation,
} = brandsApiSlice;
