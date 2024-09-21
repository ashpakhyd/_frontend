import { api } from "./api";

export const conditionApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getOpenBoxProducts: builder.query({
      query: ({ limit = 10, page = 1 }) =>
        `/openbox/getopenboxProducts?limit=${limit}&page=${page}`,
      providesTags: ["openboxProducts"],
    }),
    getProductSKU: builder.query({
      query: ({ limit = 10, page = 1, search = "" }) => ({
        url: `/openbox/getProductSKU?limit=${limit}&page=${page}&search=${search}`,
      }),
      providesTags: ["ProductSKU"],
    }),
    getOpenBoxDropdownList: builder.query({
      query: ({ limit = 10, page = 1, search = "" }) => ({
        url: `/openbox/getOpenBox?status=isActive&limit=${limit}&page=${page}&search=${search}`,
      }),
      providesTags: ["openBoxDropdownList"],
    }),
    assignOpenBox: builder.mutation({
      query: (body) => ({
        url: `/openbox/assignOpenBox`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["openboxProducts"],
    }),
    updateAssignOpenBox: builder.mutation({
      query: (body) => ({
        url: `/openbox/updateOpenBoxProducts`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["openboxProducts"],
    }),
  }),
});

export const {
  useGetOpenBoxProductsQuery,
  useGetProductSKUQuery,
  useGetOpenBoxDropdownListQuery,
  useUpdateAssignOpenBoxMutation,
  useAssignOpenBoxMutation
} = conditionApiSlice;
