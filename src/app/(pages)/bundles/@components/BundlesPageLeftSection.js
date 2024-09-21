import CustomAutoComplete from "@/components/commonComponents/Autocomplete/Autocomplete";
import Container from "@/components/commonComponents/Container/Container";
import FilePicker from "@/components/commonComponents/FilePicker/FilePicker";
import GlobalDropdown from "@/components/commonComponents/GlobalDropdown/GlobalDropdown";
import Loader from "@/components/commonComponents/Loader/Loader";
import CustomInput from "@/components/commonComponents/TextInput/TextInput";
import { Title } from "@/components/commonComponents/Titles/Titles";
import Toggle from "@/components/commonComponents/Toggle/Toggle";
import { useGetBrandsQuery } from "@/redux/apiSlices/brandsApi";
import { useGetCategoriesQuery } from "@/redux/apiSlices/categoriesApi";
import { useGetProductListsQuery } from "@/redux/apiSlices/productsApi";
import { useGetSubCategoriesByIdQuery } from "@/redux/apiSlices/subCategoriesApi";
import { cn, getThumbnailUrl, isValid } from "@/utils/common-utils";
import Checkbox from "@/components/commonComponents/Checkbox/Checkbox";
import { useCallback, useEffect, useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";

const applianceOptions = [
  { label: "Kitchen Appliances", value: "kitchen" },
  { label: "Non-Kitchen Appliances", value: "nonKitchen" },
];

const BundlesPageLeftSection = ({
  control,
  watch,
  setValue,
  errors,
  getValues,
  mode,
  setSelectedProductsByCategory,
  selectedProductsByCategory,
  bundleData,
  proData,
  setProData,
}) => {
  const { categoryId, applianceType } = watch();

  const { data: brandData, isLoading: isBrandLoading } = useGetBrandsQuery({
    filterBy: "isActive",
    filterValue: "true",
  });
  const brandOptions =
    brandData?.data.map((item) => ({
      label: item?.brandName,
      value: item?.id,
    })) || [];

  const { data: categoriesResponce, isFetching: isCategoriesLoading } =
    useGetCategoriesQuery({
      filterBy: "isActive",
      filterValue: "true",
      applianceType: applianceType || null,
    });
  const categoryOptions =
    categoriesResponce?.data.map((item) => ({
      label: item?.categoryName,
      value: item?.id,
    })) || [];

  const editedBrand =
    [
      {
        label: getValues()?.brandName,
        value: getValues()?.brandId,
      },
    ] || [];

  const [queryParams, setQueryParams] = useState({
    limit: 24,
    page: 1,
    search: "",
  });
  const { limit, page, search } = queryParams;
  const { data: productListData, isFetching } = useGetProductListsQuery({
    limit,
    page,
    search,
    categoryId,
  });
  const productList = productListData?.data;

  const OnLoadMore = useCallback(() => {
    if (isFetching) return;
    setQueryParams((prev) => ({
      ...prev,
      page: prev.page + 1,
      limit: 12,
    }));
  }, [isFetching, setQueryParams]);
  

  const handleSearch = (searchQuery) => {
    setQueryParams((prev) => ({
      ...prev,
      search: searchQuery,
      page: 1,
    }));
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedHandleSearch = debounce(handleSearch, 400);

  useEffect(() => {
    setQueryParams({
      page: 1,
    });
  }, []);

  const checkedItems = watch("productIds") || [];
  const handleSelect = useCallback((productId, productCategoryId, product) => {
    const isChecked =
      selectedProductsByCategory[productCategoryId] === productId;
  
    if (isChecked) {
      setProData((prevState) =>
        prevState.filter((item) => item.productId !== productId)
      );
      setSelectedProductsByCategory((prevState) => {
        const updatedState = { ...prevState };
        delete updatedState[productCategoryId];
        return updatedState;
      });
  
      const updatedCheckedItems = checkedItems?.filter(
        (id) => id !== productId
      );
      setValue("productIds", updatedCheckedItems);
    } else if (!selectedProductsByCategory[productCategoryId]) {
      setProData((prevState) => {
        const productExists = prevState.some(
          (item) => item.productId === productId
        );
  
        if (!productExists) {
          return [...prevState, { productId, ...product }];
        }
        return prevState;
      });
  
      setSelectedProductsByCategory((prevState) => ({
        ...prevState,
        [productCategoryId]: productId,
      }));
  
      const updatedCheckedItems = [...checkedItems, productId];
      setValue("productIds", updatedCheckedItems);
    }
  }, [selectedProductsByCategory, checkedItems, setProData, setSelectedProductsByCategory, setValue]);
  
  return (
    <>
      <Container>
        <div className="mt-4 flex w-full justify-between">
          <Controller
            name="brandId"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <GlobalDropdown
                field={field}
                options={mode === "edit" ? editedBrand : brandOptions}
                isMulti={false}
                placeholder="E.g. Samsung"
                label="Brand"
                labelStyle={"dropLabel"}
                name="brandId"
                errors={errors}
                errorMessage="Please select brand"
                required={mode === "edit" ? false : true}
                disabled={mode === "edit" ? true : false}
              />
            )}
          />
        </div>
        {mode === "save" && (
          <>
            <div className="mt-4 flex w-full justify-between">
              <Controller
                name="applianceType"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <GlobalDropdown
                    field={field}
                    options={applianceOptions}
                    isMulti={false}
                    placeholder="Select Appliance Type"
                    label="Appliance Type"
                    labelStyle={"dropLabel"}
                    name="applianceType"
                    errors={errors}
                    errorMessage="Please select appliance type"
                    required={true}
                  />
                )}
              />
            </div>
            {applianceType && 
            <div className="mt-4 flex w-full justify-between">
              <Controller
                name="categoryId"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <GlobalDropdown
                    field={field}
                    options={categoryOptions}
                    isMulti={false}
                    placeholder="E.g. Refrigerator"
                    label="Category"
                    name="categoryId"
                    labelStyle={"dropLabel"}
                    errors={errors}
                    errorMessage="Please select category"
                    required={mode === "edit" ? false : true}
                  />
                )}
              />
            </div>
            }
          </>
        )}
        {categoryId && (
          <>
            <div className="mt-4 mb-3">
              <label className="dropLabel ">Search product</label>
              <input
                placeholder="Search by Product Name or SKU"
                className="p-2 border border-gray-300 rounded  GlobarSearchStyle"
                onChange={(e) => debouncedHandleSearch(e.target.value)}
              />
            </div>
            <label className="font-semibold text-lg mt-3">Product List</label>
            <div id="scrollableDiv" className="h-[300px] overflow-y-auto">
              <InfiniteScroll
                dataLength={productList?.length || 0}
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
                <div className="flex flex-col mt-4">
                  {productList?.length > 0 ? (
                    productList.map((product) => (
                      <div key={product.id} className="p-4 border_gray">
                        <div className="flex items-center space-x-4">
                          <Checkbox
                            label=""
                            isSelected={
                              selectedProductsByCategory[product.categoryId] ===
                              product.id
                            }
                            checked={
                              selectedProductsByCategory[product.categoryId] ===
                              product.id
                            }
                            onChange={() =>
                              handleSelect(
                                product.id,
                                product.categoryId,
                                product
                              )
                            }
                            disabled={
                              selectedProductsByCategory[product.categoryId] &&
                              selectedProductsByCategory[product.categoryId] !==
                                product.id
                            }
                          />
                          <Image
                            src={getThumbnailUrl(product?.productImages)}
                            alt="Product image"
                            className="w-[60px] h-[60px] object-cover"
                            width={60}
                            height={60}
                          />
                          <div>
                            <h3 className="font-semibold text-xs text-lg">
                              {product.ProductName}
                            </h3>
                            <p className="text-xs text-gray-600 ">
                              Model: {product.SKU}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-sm font-semibold">
                      {isFetching ? (
                        <Loader
                          size="lg"
                          className="flex items-center justify-center h-[50px]"
                        />
                      ) : (
                        "No products found"
                      )}
                    </div>
                  )}
                </div>
              </InfiniteScroll>
            </div>
          </>
        )}
      </Container>
      <Container>
        <div>
          <Controller
            name="name"
            control={control}
            rules={{
              required: { value: true, message: "Please enter bundle title" },
            }}
            render={({ field }) => (
              <CustomInput
                type="text"
                placeholder="E.g. LG Bundle"
                label="Bundle Title"
                labelPlacement="outside"
                isInvalid={isValid("name", errors)}
                errorMessage="Please enter bundle title"
                {...field}
              />
            )}
          />
        </div>
      </Container>

      {mode === "edit" && (
        <Container>
          <div>
            <h2 className="font-bold text-lg">Selected Products</h2>
            {bundleData?.data?.BundleProducts.map((bundleProduct) => {
              const product = bundleProduct.Product;
              return (
                <div
                  key={bundleProduct.productId}
                  className="p-4 border-b border-gray-300 flex items-center space-x-4"
                >
                  <div>
                    <h3 className="font-semibold text-xs">
                      {product.ProductName}
                    </h3>
                    <p className="text-xs text-gray-600">SKU: {product.SKU}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      )}
    </>
  );
};

export default BundlesPageLeftSection;
