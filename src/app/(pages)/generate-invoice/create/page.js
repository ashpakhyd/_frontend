"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import InvoiceFormWrapper from "../@components/InvoiceFormWrapper";
import { useCreateInvoiceMutation } from "@/redux/apiSlices/invoiceApi";

const DeliveryRoutes = () => {
  const router = useRouter();

  // #1 USEFORM DATA
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useForm({
    defaultValues: {
      billFrom: {
        name: "ARBAZ AHEMAD SHAIKH",
        companyName: "SHAIKH UNITED GROUP",
        address: "1st floor, Happy House, Gangakhed",
        dist: "Parbhani",
        state: "Maharashtra",
        pinCode: "431514",
      },
  
      products: [
        {
          hsnCode: '',
          gstPercentage: '',
          productName: '',
          totalPieces: '',
          productDescription: '',
          qty: '',
          state: '',
          price: '',
        },
      ],
      invoiceNumber: "",
      invoiceDate: "",
      dueDate: "",
      truckNumber: "",
      driverName: "",
      ewayBillNumber: "",
    },
  });

  // #4 CREATE INVOICE API: POST METHOD
  const [createinvoice, { data, isLoading, isSuccess }] = useCreateInvoiceMutation();

  // #5 ROUTING PAGE WHEN INVOICE CREATED
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

  // #6 FORM SUBMISSION HANDLER
  const onSubmit = (formData) => {
    createinvoice(formData)
      .unwrap()
      .then((response) => {
        console.log("Invoice created successfully", response);
        // toast.success(response?.message || "Failed to create invoice");

      })
      .catch((error) => {
        console.error("Error creating invoice:", error);
        toast.error(error?.data?.message  || "Failed to create invoice");
      });
  };

  return (
    <>
      <InvoiceFormWrapper
         mode={"create"}
         onSubmit={onSubmit}
         handleSubmit={handleSubmit}
         control={control}
         errors={errors}
         watch={watch}
         getValues={getValues}
      />
    </>
  );
};

export default DeliveryRoutes;
