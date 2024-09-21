import { api } from "./api";

export const conditionApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getConditionList: builder.query({
      query: ({ limit = 10, page = 1 }) =>
        `/openbox/getCondition?limit=${limit}&page=${page}`,
      providesTags: ["conditions"],
    }),
    createCondition: builder.mutation({
      query: (body) => ({
        url: `/openbox/createConditions`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["conditions"],
    }),
    updateCondition: builder.mutation({
      query: (body) => ({
        url: `/openbox/updateCondition`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["conditions"],
    }),
    deleteCondition: builder.mutation({
      query: (body) => ({
        url: `/openbox/deleteCondition`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["conditions"],
    }),
  }),
});

export const {
  useGetConditionListQuery,
  useCreateConditionMutation,
  useUpdateConditionMutation,
  useDeleteConditionMutation,
} = conditionApiSlice;
