import { api } from "./api";

export const addonsApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getWarranty: builder.query({
      query: ({
        limit = 10,
        page = 1,
        // sortField = "createdAt",
      }) => `warranty/getWarrantyList?limit=${limit}&page=${page}`,
      providesTags: ["warranty"],
    }),
    getWarrantyById: builder.query({
      query: (id) => `/warranty/getWarrantybyID?id=${id}`,
      providesTags: ["warranty"],
    }),
    createWarranty: builder.mutation({
      query: (body) => ({
        url: `/warranty/createWarranty`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["warranty"],
    }),
    updateWarranty: builder.mutation({
      query: (body) => ({
        url: `/warranty/updateWarranty`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["warranty"],
    }),
    statusWarranty: builder.mutation({
      query: (body) => ({
        url: `/warranty/updateWarrantyStatus`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["warranty"],
    }),
  }),
});

export const {
  useGetWarrantyQuery,
  useGetWarrantyByIdQuery,
  useCreateWarrantyMutation,
  useUpdateWarrantyMutation,
  useStatusWarrantyMutation,
} = addonsApiSlice;
