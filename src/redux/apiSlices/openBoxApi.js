import { api } from "./api";

export const openBoxApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getOpenBoxList: builder.query({
      query: ({ limit = 10, page = 1 }) =>
        `/openbox/getOpenBox?limit=${limit}&page=${page}`,
      providesTags: ["openBox"],
    }),

    createOpenBox: builder.mutation({
      query: (body) => ({
        url: `/openbox/createOpenBox`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["openBox"],
    }),

    updateOpenBox: builder.mutation({
      query: (body) => ({
        url: `/openbox/updateOpenBox`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["openBox"],
    }),
  }),
});

export const {
  useGetOpenBoxListQuery,
  useCreateOpenBoxMutation,
  useUpdateOpenBoxMutation,
} = openBoxApiSlice;
