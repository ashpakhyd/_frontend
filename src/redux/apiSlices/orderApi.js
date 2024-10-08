import { api } from "./api";

export const invoicesApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: () => ({
        url: `/api/orders`,
      }),
      providesTags: ["invoices"],
    }),
    createInvoice: builder.mutation({
      query: (body) => ({
        url: `/invoices/createInvoice`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["invoices"],
    }),
    updateInvoice: builder.mutation({
      query: (body) => ({
        url: `/invoices/updateInvoice`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["invoices"],
    }),
    updateInvoiceStatus: builder.mutation({
      query: (body) => ({
        url: `/invoices/updateInvoiceStatus`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["invoices"],
    }),
  }),
});

export const {
    useGetOrderQuery,
} = invoicesApiSlice;
