import Container from "@/components/commonComponents/Container/Container";
import FilePicker from "@/components/commonComponents/FilePicker/FilePicker";
import { Title } from "@/components/commonComponents/Titles/Titles";
import Toggle from "@/components/commonComponents/Toggle/Toggle";
import CrossIcon from "@/components/icons/CrossArrowIcon";
import { useGetProductListsQuery } from "@/redux/apiSlices/productsApi";
import { getThumbnailUrl } from "@/utils/common-utils";
import Image from "next/image";
import React from "react";
import { Controller } from "react-hook-form";

const BundlesPageRightSection = ({
  setValue,
  control,
  image,
  thumbnail,
  errors,
  watch,
  setSelectedProductsByCategory,
  selectedProductsByCategory,
  bundleData,
  mode,
  proData,
  setProData,
}) => {
  const checkedItems = watch("productIds") || [];
  const { applianceType } = watch();
  const minProductsRequired = applianceType === "kitchen" ? 4 : 2;

  console.log("selectedProductsByCategory", selectedProductsByCategory);
  const handleRemoveProduct = (productId) => {
    setSelectedProductsByCategory((prevState) => {
      const updatedState = Object.fromEntries(
        Object.entries(prevState).filter(([, value]) => value !== productId)
      );
      return updatedState;
    });
    setProData((prevState) =>
      prevState.filter((item) => item.id !== productId)
    );
    const updatedCheckedItems = checkedItems?.filter((id) => id !== productId);
    setValue("productIds", updatedCheckedItems);
  };
  return (
    <>
      <Container>
        <Title className="mb-4">Status</Title>
        <Controller
          name="isActive"
          control={control}
          render={({ field }) => (
            <Toggle
              label="Active"
              isSelected={field?.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
      </Container>
      <Container className="p-4 bg-white rounded-md shadow-md">
        <Title className="text-lg font-semibold mb-4">Product Image</Title>
        <div className="mb-6">
          <Title className="text-sm font-normal text-gray-700 mb-2">
            Upload Bundle Image
          </Title>
          <Controller
            name="image"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FilePicker
                label="Image"
                className="h-35"
                folderName="bundle"
                imageUrl={image?.imageurl || ""}
                onSuccess={(imageurl, originalUrl) => {
                  field.onChange({ imageurl, originalUrl });
                }}
                onClose={() => {
                  field.onChange(null);
                }}
                isInvalid={errors["image"]}
                errorMessage={
                  errors["image"] ? "Please upload bundle image" : ""
                }
                {...field}
              />
            )}
          />
        </div>
        <div>
          <Title className="text-sm font-normal text-gray-700 mb-2">
            Upload Thumbnail
          </Title>
          <Controller
            name="thumbnail"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FilePicker
                label="thumbnail"
                className="h-35"
                folderName="bundle"
                imageUrl={thumbnail?.imageurl || ""}
                onSuccess={(imageurl, originalUrl) => {
                  field.onChange({ imageurl, originalUrl });
                }}
                onClose={() => {
                  field.onChange(null);
                }}
                isInvalid={errors["thumbnail"]}
                errorMessage={
                  errors["thumbnail"] ? "Please upload bundle thumbnail" : ""
                }
                {...field}
              />
            )}
          />
        </div>
      </Container>

      {mode === "save" && (
        <Container>
          <div className="mt-4">
            <h2 className="font-bold text-lg">
              Selected Products {proData.length}
            </h2>
            {applianceType && (
              <p className="dropLabel mt-2">
                {proData.length < minProductsRequired
                  ? applianceType === "kitchen"
                    ? "Please select at least 4 products for kitchen appliances."
                    : "Please select at least 2 products for non-kitchen appliances."
                  : proData.length > 5
                  ? "You can only select up to 5 products."
                  : "Bundle size is just right."}
              </p>
            )}
            <div className=" gap-4 mt-4 ">
              {proData.map((item) => {
                return (
                  <div
                    key={item?.id}
                    className="p-4 border-b border-gray-300 flex items-center space-x-4"
                  >
                    <Image
                      src={getThumbnailUrl(item?.productImages)}
                      alt="Product image"
                      className="w-[60px] h-[60px] object-cover"
                      width={40}
                      height={40}
                    />
                    <div>
                      <h3
                        className="font-semibold text-xs truncate w-36 "
                        title={item.ProductName}
                      >
                        {item.ProductName}
                      </h3>

                      <p className="text-xs text-gray-600 mt-1">
                        SKU: {item.SKU}
                      </p>
                      <h3
                        className=" text-xs truncate w-36 mb-2"
                        title={item.categoryName}
                      >
                        Category: {item.categoryName}
                      </h3>
                    </div>
                    <button
                      className="ml-auto"
                      onClick={() => handleRemoveProduct(item?.id)}
                    >
                      <CrossIcon className="text-red-500" size={24} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default BundlesPageRightSection;
