"use client";
import { useCreateProductMutation } from "@/redux/apiSlices/productsApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ProductFormWrapper from "../@component/ProductFormWrapper";

const CreateProduct = () => {
  const router = useRouter();
  const [createProduct, { data, isSuccess }] = useCreateProductMutation();
  const formValues = useForm({
    defaultValues: {
      productImages: [],
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

  useEffect(() => {
    if (isSuccess) {
      if (data.statusCode === 200) {
        toast.success(data?.msg);
        router.push("/products");
      } else {
        toast.error(data?.msg);
      }
    }
  }, [isSuccess]);

  const onSubmit = (data) => {
    console.log(data);
    createProduct(data);
  };
  return <ProductFormWrapper mode="save" {...formValues} onSubmit={onSubmit} />;
};

export default CreateProduct;
