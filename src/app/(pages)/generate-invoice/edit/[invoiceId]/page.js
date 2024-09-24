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
  } = useForm({
    defaultValues: {},
  });

  const { data: invoiceData, isLoading: loadingById } = useGetInvoiceByIdQuery(
    params?.invoiceId
  );

  useEffect(() => {
    if (invoiceData && invoiceData?.invoice) {
      reset({ ...invoiceData?.invoice });
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
        mode={"create"}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        control={control}
        errors={errors}
      />
    </>
  );
};

export default EditInvoice;
