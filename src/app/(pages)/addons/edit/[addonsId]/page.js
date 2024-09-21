"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AddonsFormWrapper from "../../@components/AddonsFormWrapper";
import {
  useGetAddonsByIdQuery,
  useUpdateAddonsMutation,
} from "@/redux/apiSlices/addonsApi";
const EditAddons = ({ params }) => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
    reset,
  } = useForm({
    defaultValues: {},
  });

  const { data: addonsData, isLoading: updateLoading } = useGetAddonsByIdQuery(
    params?.addonsId
  );
  const [updateAddons, { data, isLoading, isSuccess, isError, error }] =
    useUpdateAddonsMutation();

  useEffect(() => {
    if (addonsData && addonsData?.data) {
      reset({ ...addonsData?.data });
    }
  }, [addonsData, reset]);

  useEffect(() => {
    if (isSuccess && data) {
      if (data.success) {
        toast.success(data?.msg);
        router.push("/addons");
      } else {
        toast.error(data.msg);
      }
    } else if (isError) {
      const errorMsg = error?.data?.msg || "Something went wrong!";
      toast.error(errorMsg);
    }
  }, [isSuccess, isError, data, error]);

  const onSubmit = (formData) => {
    const { categoryId, subCategoryId, sku, serviceType, description, name, price, id } = formData;
    formData.price = Number(formData.price);
    const filteredFormData = { categoryId, subCategoryId, sku, name, serviceType, description, addonServiceId: id, price: Number(price) }; // Add or remove fields as needed
    updateAddons({ ...filteredFormData });
    // console.log("formData", filteredFormData);
  };
  return (
    <>
      <AddonsFormWrapper
        mode={"edit"}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        control={control}
        errors={errors}
        watch={watch}
        getValues={getValues}
        isLoading={isLoading}
      />
    </>
  );
};

export default EditAddons;
