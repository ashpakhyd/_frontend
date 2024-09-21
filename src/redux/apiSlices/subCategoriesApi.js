import { api } from "./api";

export const subCategoriesApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getSubCategoriesById: builder.query({
      query: (body) => ({
        //Query: how many working parameters are here?
        url: `/product/getSubCategoriesList`,
        method: "POST",
        body,
      }),
      providesTags: ["subCategories"],
    }),

    createSubCatergory: builder.mutation({
      query: (body) => ({
        url: `/product/createSubCategory`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["subCategories"],
    }),

    updateSubCatergory: builder.mutation({
      query: (body) => ({
        url: `/product/editSubCategory`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["subCategories"],
    }),

    updateSubCatergoryStatus: builder.mutation({
      query: (body) => ({
        url: `/product/updateSubCategoryStatus`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["subCategories"],
    }),
  }),
});

export const {
  useGetSubCategoriesByIdQuery,
  useCreateSubCatergoryMutation,
  useUpdateSubCatergoryMutation,
  useUpdateSubCatergoryStatusMutation,
} = subCategoriesApiSlice;
