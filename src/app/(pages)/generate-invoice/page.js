"use client";
import React, { useEffect, useState } from 'react';
import TableContainer from '@/components/table/tablecontainer';
import ConfirmationModal from '@/components/commonComponents/ConfirmationModal/ConfirmationModal';
import CustomButton from '@/components/commonComponents/Button/Button';
import { PopUpModal } from '@/components/commonComponents/Modal/Modal';
import Link from 'next/link';
import { useDeleteInvoiceMutation, useGetInvoicesQuery } from '@/redux/apiSlices/invoiceApi';
import { toast } from 'react-toastify';
import { useQueryParams } from '@/utils/useQueryParams';
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const INITIAL_VISIBLE_COLUMNS = [
  { name: "Invoice Number", uid: "invoiceNumber" },
  { name: "Client Name", uid: "clientName" },
  { name: "Truck Number", uid: "truckNumber" },
  { name: "Invoice Date", uid: "invoiceDate" },
  { name: "Due Date", uid: "dueDate" },
  { name: "Actions", uid: "actions" },
];

const Page = () => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const { limit, page, search } = useQueryParams();
  const { data, isFetching, isSuccess } = useGetInvoicesQuery({
    limit,
    page,
    search,
  });
  
  const [
    deleteInvoiceStatus,
    {
      data: deleteInvoice,
      isFetching: successDeletedInvoice,
      isLoading: loadingDeleteInvoice,
    },
  ] = useDeleteInvoiceMutation();


  const handleDelete = (id) => {
    setSelectedInvoice(id);
  };

  const confirmToggleChange = () => {
    console.log("clicked");
    deleteInvoiceStatus(selectedInvoice)
      .unwrap() // This will help to handle the response or error
      .then(() => {
        setSelectedInvoice(null);
        toast.success("Invoice deleted successfully!"); // Toast message after successful deletion
      })
      .catch((error) => {
        console.error("Failed to delete invoice:", error);
        toast.error("Failed to delete invoice!"); // Show error message if delete fails
      });
  };

  return (
    <>
      <div className="text-center">
        <ConfirmationModal
          message={`Are you sure you want to delete this invoice?`}
          onConfirm={confirmToggleChange}
          onCancel={() => setSelectedInvoice(null)}
          isModalOpen={!!selectedInvoice}
        />
        <TableContainer
          headerColumns={INITIAL_VISIBLE_COLUMNS}
          data={isSuccess ? data?.invoices : []}
          isLoading={isFetching}
          isSuccess={isSuccess}
          paginationData={{
            totalPages: data?.totalPages,
            currentPage: data?.currentPage,
            invoicesPerPage: data?.invoicesPerPage,
          }}
          showFilters={false}
          tableLabel="Invoice List"
          headerButtons={
            <PopUpModal
              title={(onOpen) => (
                <CustomButton
                  as={Link}
                  href="/generate-invoice/create"
                  className="py-2 px-4 border-none rounded-lg bg-primaryBtn text-white"
                >
                  Add Invoice
                </CustomButton>
              )}
            />
          }
          customRender={(data, columnKey, cellValue) => {
            switch (columnKey) {
              case "invoiceDate":
              case "dueDate":
                return new Date(data[columnKey]).toLocaleDateString();
              case "actions":
                return (
                  <div className="flex gap-6">
                    <Link href={`/generate-invoice/view/${data?._id}`}>
                      <FaEye  />
                    </Link>
                    <Link href={`/generate-invoice/edit/${data?._id}`}>
                      <FaEdit />
                    </Link>
                    <button onClick={() => handleDelete(data?._id)}>
                      <MdDelete />
                    </button>
                  </div>
                );
              default:
                return cellValue || data[columnKey];
            }
          }}
        />
      </div>
    </>
  );
};

export default Page;
