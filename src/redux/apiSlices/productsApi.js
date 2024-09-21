import { api } from "./api";

export const productsApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({
        limit = 10,
        page = 1,
        sortField = "",
        sortOrder = "",
        search = "",
        filterBy,
        filterValue,
      }) =>({
        url: `/product/getProductsList?limit=${limit}&page=${page}&sortField=${sortField}&sortOrder=${sortOrder}&filterBy=${filterBy}&filterValue=${filterValue}&search=${search}`,
      }),
      providesTags: ["products"],
    }),

    getProductById: builder.query({
      query: ({ productId }) => ({
        url: `/product/getProductById?id=${productId}`,
      }),
      providesTags: ["update products"],
    }),
    createProduct: builder.mutation({
      query: (body) => ({
        url: `/product/createProduct`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      query: (body) => ({
        url: `/product/editProduct`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["products", "update products"],
    }),
    getProductLists: builder.query({
      query: ({
        limit = 24,
        page = 1,
        search = "",
        categoryId = "",
        subCategoryId="",
        brand = "",
      }) => ({
        url: `/product/getProductListWebsite?categoryId=${categoryId}&subCategoryId=${subCategoryId}&limit=${limit}&page=${page}&search=${search}&brand=${brand}`,
        providesTags: ["products"],
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        // Serialize query args to cache based on categoryId and subCategoryId
        return `${endpointName}-${queryArgs.categoryId}-${queryArgs.subCategoryId}-${queryArgs.search}-${queryArgs.brand}`;
      },
      merge: (currentCache, newItems) => {
        currentCache.pagination = newItems.pagination;
        currentCache.data = currentCache.data || [];
        currentCache.data.push(...newItems.data);
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        if (!previousArg) return true;
        return (
          currentArg.page !== previousArg.page ||
          currentArg.search !== previousArg.search
        );
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetProductListsQuery,
} = productsApiSlice;
