import { api } from "./api";

export const deliveryRoutesApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getDeliveryRoutes: builder.query({
      query: ({
        limit = 10,
        page = 1,
        // sortField = "createdAt",
      }) => `/delivery/getDeliveryRouteList?limit=${limit}&page=${page}`,
      providesTags: ["deliveryRoutes"],
    }),
    createDeliveryRoutes: builder.mutation({
      query: (body) => ({
        url: `/delivery/createDeliveryRoute`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["deliveryRoutes"],
    }),
    getDeliveryRoutesById: builder.query({
      query: (id) => `/delivery/getDeliveryRouteById?id=${id}`,
      providesTags: ["deliveryRoutes"],
    }),
    updateDeliveryRoutes: builder.mutation({
      query: (body) => ({
        url: `/delivery/editDeliveryRoute`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["deliveryRoutes"],
    }),
    statusDeliveryRoutes: builder.mutation({
      query: (body) => ({
        url: `/delivery/updateDeliveryRouteStatus`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["deliveryRoutes"],
    }),



    getRouteClassList: builder.query({
      query: () => `/aha/getRouteClassList`,
    }),
    getRouteTypeList: builder.query({
      query: () => `/aha/getRouteTypeList`,
    }),
    getZipCodeList: builder.query({
      query: () => `/aha/getZipCodeList`,
    }),
  }),
});

export const {
  useGetDeliveryRoutesQuery,
  useGetDeliveryRoutesByIdQuery,
  useGetRouteClassListQuery,
  useGetZipCodeListQuery,
  useGetRouteTypeListQuery,
  useCreateDeliveryRoutesMutation,
  useUpdateDeliveryRoutesMutation,
  useStatusDeliveryRoutesMutation,
} = deliveryRoutesApiSlice;
