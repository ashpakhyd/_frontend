import React, { useEffect, useState } from "react";
import CustomButton from "@/components/commonComponents/Button/Button";
import CustomCheckbox from "@/components/commonComponents/Checkbox/Checkbox";
import Loader from "@/components/commonComponents/Loader/Loader";
import { useGetProductListsQuery } from "@/redux/apiSlices/productsApi";
import { getThumbnailUrl } from "@/utils/common-utils";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";

const BundlesProductModal = ({
  brandId,
  catId,
  setCheckedItems,
  handleCheckboxChange,
  checkedItems,
  onClose,
  ModalHeader,
  ModalBody,
  ModalFooter,
  mode = "add",
  formData = null,
  watch,
}) => {
  const [queryParams, setQueryParams] = useState({
    limit: 24,
    page: 1,
  });
  const { limit, page } = queryParams;

  const { data: productListData, isFetching } = useGetProductListsQuery({
    limit,
    page,
    brand: brandId,
    categoryId: catId,
  });

  const OnLoadMore = () => {
    console.log("scrolling");

    if (isFetching) return;
    setQueryParams((prev) => ({
      ...prev,
      page: prev.page + 1,
      limit: 12,
    }));
  };

  useEffect(() => {
    setQueryParams({
      page: 1,
    });
  }, []);

  const product = productListData?.data;

  if (!product) {
    return (
      <Loader
        size="lg"
        className="flex items-center justify-center h-[100px]"
      />
    );
  }

  console.log("productListData", product?.length);
  return (
    <div>
      <ModalHeader>
        <p className="flex flex-col gap-1 font-bold text-md">Product List</p>
      </ModalHeader>
      <ModalBody id="scrollableDiv" className="h-[400px] overflow-y-auto">
        <InfiniteScroll
          dataLength={product?.length || 0}
          next={OnLoadMore}
          hasMore={productListData?.pagination?.hasNextPage || false}
          scrollableTarget="scrollableDiv"
          loader={
            <Loader
              size="lg"
              className="flex items-center justify-center h-[50px]"
            />
          }
        >
          {product.map((product) => (
            <div key={product.id} className="flex items-center border-b py-2">
              <CustomCheckbox
                label=""
                className="mr-2"
                disabled={mode === "edit"}
                isSelected={checkedItems.includes(product.id)}
                onChange={() => handleCheckboxChange(product.id)}
              />

              <Image
                src={getThumbnailUrl(product?.productImages)}
                alt="Product image"
                className="w-[60px] h-[60px] object-cover"
                width={60}
                height={60}
              />
              <div className="ml-4 flex-grow">
                <h3 className="text-sm font-bold">{product.productName}</h3>
                <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                <div className="flex items-center">
                  {product.price_details.crossedPrice && (
                    <span className="text-xs line-through text-gray-500">
                      {product.price_details.crossedPrice}
                    </span>
                  )}
                  <span className="text-sm font-bold ml-2">
                    {product.price_details.displayPrice}
                  </span>
                  {product.price_details.savingPercentage && (
                    <span className="text-xs text-red-500 ml-2">
                      {product.price_details.savingPercentage}% OFF
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </ModalBody>

      <ModalFooter>
        <CustomButton
          className="text-white bg-primaryBtn w-full"
          type="button"
          onClick={onClose}
        >
          Select Products
        </CustomButton>
      </ModalFooter>
    </div>
  );
};

export default BundlesProductModal;
