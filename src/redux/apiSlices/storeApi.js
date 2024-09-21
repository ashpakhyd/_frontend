import { api } from "./api";

export const storeApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getStoreList: builder.query({
      query: ({ limit = 10, page = 1 }) =>
        `/store/getStoreList?limit=${limit}&page=${page}`,
      providesTags: ["store"],
    }),

    createStore: builder.mutation({
      query: (body) => ({
        url: `/store/createStore`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["store"],
    }),
    getStoreById: builder.query({
      query: ({ id }) => `/store/getStoreByID?id=${id}`,
    }),
    updateStore: builder.mutation({
      query: (body) => ({
        url: `/store/updateStore`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["store"],
    }),

    deleteStore: builder.mutation({
      query: (body) => ({
        url: `/store/deleteStore`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["store"],
    }),
  }),
});

export const {
  useGetStoreListQuery,
  useCreateStoreMutation,
  useGetStoreByIdQuery,
  useUpdateStoreMutation,
  useDeleteStoreMutation,
} = storeApiSlice;
