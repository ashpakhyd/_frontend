import { api } from "./api";

export const categoriesApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: ({
        limit = 10,
        page = 1,
        sortField = "createdAt",
        sortOrder = "DESC",
        filterBy,
        filterValue,
        search = "",
        applianceType = "",
      }) =>
        `/product/getCategoriesList?limit=${limit}&page=${page}&sortField=${sortField}&sortOrder=${sortOrder}&filterBy=${filterBy}&filterValue=${filterValue}&search=${search}&applianceType=${applianceType}`,
      providesTags: ["categories"],
    }),
    createCategory: builder.mutation({
      query: (body) => ({
        url: `/product/createCategory`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["categories"],
    }),
    updateCategory: builder.mutation({
      query: (body) => ({
        url: `/product/editCategory`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["categories"],
    }),
    updateCategoryStatus: builder.mutation({
      query: (body) => ({
        url: `/product/updateCategoryStatus`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useUpdateCategoryStatusMutation,
} = categoriesApiSlice;
