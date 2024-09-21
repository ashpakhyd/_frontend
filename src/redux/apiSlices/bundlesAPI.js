import { api } from "./api";

export const bundlesApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getBundles: builder.query({
      query: ({
        limit = 10,
        page = 1,
        // sortField = "createdAt",
      }) => `/bundle/getBundleList?limit=${limit}&page=${page}`,
      providesTags: ["bundles"],
    }),
    getBundleById: builder.query({
      query: (id) => `/bundle/getBundleById?id=${id}`,
      providesTags: ["bundles"],
    }),
    createBundle: builder.mutation({
      query: (body) => ({
        url: `/bundle/createBundle`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["bundles"],
    }),
    deleteBundle: builder.mutation({
      query: (body) => ({
        url: `/bundle/deleteBundle`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["bundles"],
    }),
    updateBundle: builder.mutation({
      query: (body) => ({
        url: `/bundle/updateBundle`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["bundles"],
    }),
  }),
});

export const {
  useCreateBundleMutation,
  useGetBundlesQuery,
  useDeleteBundleMutation,
  useUpdateBundleMutation,
  useGetBundleByIdQuery,
} = bundlesApiSlice;
