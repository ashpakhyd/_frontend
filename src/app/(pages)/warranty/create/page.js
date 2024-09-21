"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import WarrantyFormWrapper from "../@component/WarrantyFormWrapper";
import { useCreateWarrantyMutation } from "@/redux/apiSlices/warrantyApi";

const CreateWarranty = () => {
     const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
    getValues,
    mode = "add",
  } = useForm({
    defaultValues: {},
  });

  //#1 CREATE Addons API: POST METHOD...
  const [createWarrantyData, { data, isLoading, isSuccess, isError, error  }] =
  useCreateWarrantyMutation();

  useEffect(() => {
    if (isSuccess && data) {
      if (data.success) {
        toast.success(data?.msg);
        router.push("/warranty");
      } else {
        toast.error(data.msg);
      }
    } else if (isError) {
      const errorMsg = error?.data?.msg || "Something went wrong!";
      toast.error(errorMsg);
    }
  }, [isSuccess, isError, data, error]);
  


  const { fields, append, remove } = useFieldArray({
    control,
    name: "priceRanges",
  });
  const onSubmit = (formData) => {
    if (formData.priceRanges.length === 0) {
      toast.error("Please add at least one warranty.");
      return;
    }
    const {
      categoryId,
      subCategoryId,
      description,
      priceMin,
      priceMax,
      warrantyType,
      warrantyPrice,
    } = formData;

    let priceRanges = getValues("priceRanges") || [];

    if (warrantyType && priceMin && priceMax && warrantyPrice) {
      const newPriceRange = {
        warrantyType,
        priceMin: Number(priceMin),
        priceMax: Number(priceMax),
        warrantyPrice: Number(warrantyPrice),
      };

      if (mode === "add") {
        priceRanges.push(newPriceRange);
      } else {
        priceRanges[editIndex] = newPriceRange;
      }

      setValue("priceRanges", priceRanges);
    }

    const filteredFormData = {
      categoryId,
      subCategoryId,
      description,
      priceRanges: priceRanges.filter(
        (range) =>
          range.priceMin !== null &&
          range.priceMax !== null &&
          range.warrantyPrice !== null
      ),
    };

    console.log("getValues", getValues());
    createWarrantyData(filteredFormData);
  };
  
  return (
    <>
    <WarrantyFormWrapper
     mode={"create"}
     onSubmit={onSubmit}
     handleSubmit={handleSubmit}
     control={control}
     errors={errors}
     watch={watch}
     getValues={getValues}
     fields={fields}
     append={append}
     remove={remove}
    />
    </>
  )
}

export default CreateWarranty