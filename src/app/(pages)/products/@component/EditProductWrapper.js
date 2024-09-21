"use client";
import { useUpdateProductMutation } from "@/redux/apiSlices/productsApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ProductFormWrapper from "./ProductFormWrapper";

const EditProductWrapper = ({ data, onCancel }) => {
  const router = useRouter();

  const { data: editableData } = data || {};

  const [
    updateProduct,
    // { data: updateProductRes, isSuccess: isUpdateProductSuccess },
  ] = useUpdateProductMutation();

  const formValues = useForm({
    defaultValues: {
      productImages: [
        { imageurl: "", originalUrl: "", thumbnail: "", iscoverimage: true },
      ],
      isInStock: true,
      isWifiEnabled: false,
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
      productSpecification: [],
      productHighlights: [],
      productFeature: [],
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

  // useEffect(() => {
  //   if (isUpdateProductSuccess) {
  //     if (updateProductRes.statusCode === 200) {
  //       toast.success(updateProductRes?.msg);
  //       router.push("/products");
  //     } else {
  //       toast.error(updateProductRes?.msg);
  //     }
  //   }
  // }, [isUpdateProductSuccess]);

  const onSubmit = async (data) => {
    const result = await updateProduct(data);
    const { data: updateProductRes } = result || {};

    if (updateProductRes.statusCode === 200) {
      toast.success(updateProductRes?.msg);
      router.push("/products");
    } else {
      toast.error(updateProductRes?.msg);
    }
  };
  return (
    <>
      {/* {isFetching && <Loader />} */}
      {editableData && (
        <ProductFormWrapper
          {...formValues}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      )}
    </>
  );
};

export default EditProductWrapper;
