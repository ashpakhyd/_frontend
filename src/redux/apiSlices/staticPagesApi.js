import { api } from "./api";

export const addonsApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getStaticPages: builder.query({
      query: ({
          limit = 10,
          page = 1,
          // sortField = "createdAt",
      }) => `/staticPage/getStaticPageList`,
      providesTags: ["staticPages"],
    }),
    createStaticPages: builder.mutation({
      query: (body) => ({
        url: `/staticPage/createStaticPage`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["staticPages"],
    }),
    updateStaticPages: builder.mutation({
      query: (body) => ({
        url: `/staticPage/updateStaticPage`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["staticPages"],
    }),
    getStaticPagesById: builder.query({
      query: (id) => `/staticPage/getStaticPageById?id=${id}`,
      invalidatesTags: ["staticPages"],
    }),
    // statusAddons: builder.mutation({
    //   query: (body) => ({
    //     url: `/addOns/updateServiceStatus`,
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: ["addons"],
    // }),
  }),
});

export const {
    useGetStaticPagesQuery,
    useGetStaticPagesByIdQuery,
    useCreateStaticPagesMutation,
    useUpdateStaticPagesMutation,
} = addonsApiSlice;
