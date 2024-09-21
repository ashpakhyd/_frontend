"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AddonsFormWrapper from "../@components/AddonsFormWrapper";
import { useCreateAddonsMutation } from "@/redux/apiSlices/addonsApi";

const CreateAddons = () => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useForm({
    defaultValues: {},
  });

  const [createAddons, { data, isLoading, isSuccess, isError, error }] =
  useCreateAddonsMutation();
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
    formData.price = Number(formData.price);
    createAddons(formData);
  };
  return (
    <>
      <AddonsFormWrapper
        mode={"create"}
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

export default CreateAddons;
