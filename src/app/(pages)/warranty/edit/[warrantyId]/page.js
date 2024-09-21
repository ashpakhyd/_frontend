"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";
import {
  useGetWarrantyByIdQuery,
  useUpdateWarrantyMutation,
} from "@/redux/apiSlices/warrantyApi";
import WarrantyFormWrapper from "../../@component/WarrantyFormWrapper";

const EditWarranty = ({ params }) => {
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
    defaultValues: {
      priceRanges: [],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "priceRanges",
  });

  const { data: warrantyData, isLoading: updateLoading } =
    useGetWarrantyByIdQuery(params?.warrantyId);

  const [updateWarranty, { data, isLoading, isSuccess, isError, error }] =
    useUpdateWarrantyMutation();

  useEffect(() => {
    if (warrantyData && warrantyData?.data) {
      const formattedData = {
        ...warrantyData?.data,
        priceRanges:
          warrantyData?.data?.warrantyPriceRanges?.map((range) => ({
            priceMin: range?.priceMin || "",
            priceMax: range?.priceMax || "",
            warrantyPrice: range?.warrantyPrice || "",
            warrantyType: range?.warrantyType || "",
          })) || [],
      };
      reset(formattedData);
      if (formattedData.priceRanges.length > 0) {
        replace(formattedData.priceRanges);
      }
    }
  }, [warrantyData, reset, replace]);

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

  const onSubmit = (formData) => {
    const filteredFormData = {
      categoryId: formData.categoryId,
      subCategoryId: formData.subCategoryId,
      sku: formData.sku,
      description: formData.description,
      priceRanges: formData.priceRanges.map((range) => ({
        priceMin: Number(range.priceMin),
        priceMax: Number(range.priceMax),
        warrantyPrice: Number(range.warrantyPrice),
        warrantyType: range.warrantyType,
      })),
      warrantyId: formData.id,
    };
    updateWarranty({ ...filteredFormData });
  };

  return (
    <>
      <WarrantyFormWrapper
        mode={"edit"}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        control={control}
        errors={errors}
        watch={watch}
        getValues={getValues}
        fields={fields}
        append={append}
        remove={remove}
        isLoading={isLoading}
      />
    </>
  );
};

export default EditWarranty;
