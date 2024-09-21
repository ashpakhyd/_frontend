"use client";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BundlesFormWrapper from "../@components/BundlesFormWrapper";
import { useCreateBundleMutation } from "@/redux/apiSlices/bundlesAPI";
import { toast } from "react-toastify";

const CreateBundles = () => {
  const router = useRouter();
  const [createBundles, { data, isSuccess, isLoading }] = useCreateBundleMutation();
  const formValues = useForm({
    defaultValues: {
      isActive: false,
      productIds: [],
    },
  });

  const { watch } = formValues;
  const {applianceType} = watch();
  const checkedItems = watch("productIds");

  useEffect(() => {
    if (isSuccess) {
      if (data.statusCode === 200) {
        toast.success(data?.msg);
        router.push("/bundles");
      } else {
        toast.error(data?.msg);
      }
    }
  }, [isSuccess]);
  
  const onSubmit = (data) => {
    const minProductsRequired = applianceType === "kitchen" ? 4 : 2;

    let errorMessage;
    if (checkedItems.length < minProductsRequired) {
      errorMessage = applianceType === "kitchen"
        ? "Please select at least 4 products for kitchen appliances."
        : "Please select at least 2 products for non-kitchen appliances.";
      toast.error(errorMessage);
      return;
    } else if (checkedItems.length > 5) {
      toast.error("You can only select up to 5 products.");
      return;
    }
    
    console.log("checkedItems", data)
    createBundles({
      ...data,
      image: data?.image?.imageurl,
      originalImage: data?.image?.originalUrl,
      thumbnail: data?.thumbnail?.imageurl,
      originalThumbnail: data?.thumbnail?.originalUrl,
    });
  };
  return (
    <BundlesFormWrapper
      mode="save"
      {...formValues}
      onSubmit={onSubmit}
      isLoading={isLoading}
    />
  );
};

export default CreateBundles;
