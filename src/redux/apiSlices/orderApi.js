import { api } from "./api";

export const orderApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: ({
        limit = 10,
        page = 1,
        // sortField = "createdAt",
      }) => `/order/orderList?limit=${limit}&page=${page}`,
      providesTags: ["orderList"],
    }),
    updateOrderStatus: builder.mutation({
      query: (body) => ({
        url: `/order/updateOrderStatus`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["orderList"],
    }),
    getOrdersById: builder.query({
      query: (id) => `order/adminOrderByID?orderId=${id}`,
      providesTags: ["orderList"],
    }),
  }),
});

export const {useGetOrdersQuery, useUpdateOrderStatusMutation, useGetOrdersByIdQuery} = orderApiSlice;
