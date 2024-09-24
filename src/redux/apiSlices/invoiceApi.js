import { api } from "./api";

export const invoicesApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getInvoices: builder.query({
      query: () => ({
        url: `/api/invoices`,
      }),
      providesTags: ["invoices"],
    }),
    createInvoice: builder.mutation({
      query: (body) => ({
        url: `/api/invoices`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["invoices"],
    }),
    getInvoiceById: builder.query({
      query: (id) => `/api/invoices/${id}`, 
      providesTags: ["invoices"], 
    }),
    updateInvoice: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/invoices/${id}`, 
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["invoices"],
    }),
    deleteInvoice: builder.mutation({
      query: (id) => ({
        url: `/api/invoices/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["invoices"],
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useCreateInvoiceMutation,
  useGetInvoiceByIdQuery,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation
} = invoicesApiSlice;
