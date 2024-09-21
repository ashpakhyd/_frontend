"use client";
import {
  useCreateProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/redux/apiSlices/productsApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import ProductFormWrapper from "../../@component/ProductFormWrapper";
import Loader from "@/components/commonComponents/Loader/Loader";

const EditProduct = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const router = useRouter();

  const { isFetching, data } = useGetProductByIdQuery({
    productId,
  });
  const { data: editableData } = data || {};

  const [
    updateProduct,
    { data: updateProductRes, isSuccess: isUpdateProductSuccess, isLoading },
  ] = useUpdateProductMutation();

  const formValues = useForm({
    defaultValues: {
      isInStock: true,
      isWifiEnabled:false,
      websiteActive: false,
      floorMatrix: false,
      saleOnWebsite: false,
      webPriceInactive: false,
      websiteOutlet: false,
      bestSeller: false,
      // rank: false,
      specialBuy: false,
      customPromotion: false,
      defaultAppliance: false,
      implementWebSeeSalePriceInCart: false,
      implementWebPdpCartMapOnly: false,
      implementWebPdpCartSalePriceOnly: false,
      implementWebsiteLoginSeeSalePrice: false,
      implementWebTradePartnerPrice: false,
      productOverview: [],
      productSpecifications: [],
      productHighlights: [],
      productFeatures: [],
      productManualGuide: [
        {
          fileName: "",
          fileURL: "",
        },
      ],
    },
  });
  const { reset } = formValues;

  useEffect(() => {
    if (editableData) {
      reset(editableData);
    }
  }, [editableData]);

  useEffect(() => {
    if (isUpdateProductSuccess) {
      if (updateProductRes.statusCode === 200) {
        toast.success(updateProductRes?.msg);
        router.push("/products");
      } else {
        toast.error(updateProductRes?.msg);
      }
    }
  }, [isUpdateProductSuccess]);

  const onSubmit = (data) => {
    console.log(data);
    updateProduct(data);
  };
  return (
    <>
      {isFetching || isLoading ? (
        <Loader className="top-[40%] relative" />
      ) : (
        editableData && (
          <ProductFormWrapper
            isLoading={isLoading}
            {...formValues}
            mode="edit"
            onSubmit={onSubmit}
          />
        )
      )}
    </>
  );
};

export default EditProduct;
