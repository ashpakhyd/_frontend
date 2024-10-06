"use client";
import {
  useGetInvoiceByIdQuery,
  useUpdateInvoiceMutation,
} from "@/redux/apiSlices/invoiceApi";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import InvoiceFormWrapper from "../../@components/InvoiceFormWrapper";

const EditInvoice = ({ params }) => {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {},
  });

  const { data: invoiceData, isLoading: loadingById } = useGetInvoiceByIdQuery(
    params?.invoiceId
  );

  useEffect(() => {
    if (invoiceData && invoiceData?.invoice) {
      reset({
        ...invoiceData?.invoice,
        invoiceDate: invoiceData.invoice.invoiceDate.split("T")[0], // '2024-09-26T00:00:00.000Z' se '2024-09-26' banega
        dueDate: invoiceData.invoice.dueDate.split("T")[0],
      });
    }
  }, [invoiceData, reset]);

  const [updateInvoice, { data, isLoading, isSuccess }] =
    useUpdateInvoiceMutation();

  useEffect(() => {
    if (isSuccess) {
      if (data.success) {
        toast.success(data?.message);
        router.push("/generate-invoice");
      } else {
        toast.error(data.message || "An error occurred");
      }
    }
  }, [isSuccess]);

  const onSubmit = (formData) => {
    // Include the invoice ID when updating
    updateInvoice({ id: params?.invoiceId, body: formData });
  };

  return (
    <>
      <InvoiceFormWrapper
        mode={"edit"}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        control={control}
        errors={errors}
        watch={watch}
        isLoading={loadingById}
      />
    </>
  );
};

export default EditInvoice;
