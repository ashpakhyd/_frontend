import { api } from "./api";

export const addonsApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAddons: builder.query({
      query: ({
          limit = 10,
          page = 1,
      }) => `/addOns/getServiceList?limit=${limit}&page=${page}`,
      providesTags: ["addons"],
    }),
    createAddons: builder.mutation({
      query: (body) => ({
        url: `/addOns/createService`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["addons"],
    }),
    updateAddons: builder.mutation({
      query: (body) => ({
        url: `/addOns/updateService`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["addons"],
    }),
    getAddonsById: builder.query({
      query: (id) => `/addOns/getServiceByID?id=${id}`,
      invalidatesTags: ["addons"],
    }),
    statusAddons: builder.mutation({
      query: (body) => ({
        url: `/addOns/updateServiceStatus`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["addons"],
    }),
  }),
});

export const {
    useGetAddonsQuery,
    useGetAddonsByIdQuery,
    useCreateAddonsMutation,
    useUpdateAddonsMutation,
    useStatusAddonsMutation,

} = addonsApiSlice;
