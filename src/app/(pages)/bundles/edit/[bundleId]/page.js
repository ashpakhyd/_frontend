"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import BundlesFormWrapper from "../../@components/BundlesFormWrapper";
import { toast } from "react-toastify";
import {
  useCreateBundleMutation,
  useGetBundleByIdQuery,
  useUpdateBundleMutation,
} from "@/redux/apiSlices/bundlesAPI";

const EditBundles = ({ params }) => {
  const router = useRouter();
  const { control, setValue, handleSubmit, watch, errors } = useForm();
  const [updateBundle, { data, isSuccess, isLoading: updateLoading }] = useUpdateBundleMutation();
  const { data: bundleData, isLoading } = useGetBundleByIdQuery(
    params?.bundleId
  );
  const editProducts = bundleData?.data?.BundleProducts?.map(item => item?.productId) || [];
  const [checkedItems, setCheckedItems] = useState([]);
  const formValues = useForm({
    defaultValues: {},
  });

  console.log("bundleData", bundleData)
  useEffect(() => {
    if (bundleData && bundleData.data) {
      formValues.reset({...bundleData?.data,
         image:{imageurl: bundleData?.data?.image},
         thumbnail:{ imageurl: bundleData?.data?.thumbnail},
        },
        setCheckedItems(editProducts)
        );
   }
  }, [bundleData]);
  const handleCheckboxChange = (productId) => {
    setCheckedItems((prev) => {
      const isChecked = prev.includes(productId);
      const updatedCheckedItems = isChecked
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      formValues.setValue("productIds", updatedCheckedItems);
      return updatedCheckedItems;
    });

  };

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
    const modifiedData = {
      ...data,
      productIds: checkedItems,
      image: data?.image?.imageurl,
      originalImage: data?.image?.originalUrl,
      thumbnail: data?.thumbnail?.imageurl,
      originalThumbnail: data?.thumbnail?.originalUrl,
    };
    delete modifiedData.categoryId;
    delete modifiedData.brandName;
    delete modifiedData.brandId;
  
    updateBundle(modifiedData);
  };
  

  return (
    <BundlesFormWrapper
      mode="edit"
      {...formValues}
      onSubmit={onSubmit}
      isLoading={updateLoading}
      setCheckedItems={setCheckedItems}
      handleCheckboxChange={handleCheckboxChange}
      checkedItems={checkedItems}
      bundleData={bundleData}
    />
  );
};

export default EditBundles;
