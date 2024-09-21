"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import CustomButton from "@/components/commonComponents/Button/Button";
import CustomInput from "@/components/commonComponents/TextInput/TextInput";
import Toggle from "@/components/commonComponents/Toggle/Toggle";
import Checkbox from "@/components/commonComponents/Checkbox/Checkbox";
import Container from "@/components/commonComponents/Container/Container";
import { getThumbnailUrl, isValid } from "@/utils/common-utils";
import CustomTextArea from "@/components/commonComponents/TextArea/TextArea";
import {
  useGetRouteClassListQuery,
  useGetRouteTypeListQuery,
  useGetZipCodeListQuery,
} from "@/redux/apiSlices/deliveryRoutes";
import { useGetCategoriesQuery } from "@/redux/apiSlices/categoriesApi";
import { useGetSubCategoriesByIdQuery } from "@/redux/apiSlices/subCategoriesApi";
import { useGetProductListsQuery } from "@/redux/apiSlices/productsApi";
import Select from "react-select";
import FilePicker from "@/components/commonComponents/FilePicker/FilePicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../DeliveryRoute.css";
import GlobalDropdown from "@/components/commonComponents/GlobalDropdown/GlobalDropdown";
import makeAnimated from "react-select/animated";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "@/components/commonComponents/Loader/Loader";
import CustomCheckbox from "@/components/commonComponents/Checkbox/Checkbox";

const filterOptions = [
  { label: "By Category", value: "category" },
  { label: "By Subcategory", value: "subcategory" },
  { label: "By Global Search", value: "globalSearch" },
];
const DeliveryRoutesWrapper = ({
  onSubmit,
  handleSubmit,
  control,
  errors,
  watch,
  selectedDates,
  setSelectedDates,
  setCheckedItems,
  checkedItems,
  isLoading,
  setRouteClass,
  setRouteType,
  disableDeliveryFee,
  setCategory,
  getValues,
  mode,
}) => {
  const router = useRouter();
  const { categoryId, subCategoryName, subCategoryId, subcategory2 } = watch();
  const [categoriesPage, setCategoriesPage] = useState(1);
  const [subCategoriesPage, setSubCategoriesPage] = useState(1);
  const [categoriesQuery, setCategoriesQuery] = useState("");
  const [subCategoriesQuery, setSubCategoriesQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const animatedComponents = makeAnimated();

  const { data: categoriesResponce, isFetching: isCategoriesLoading } =
    useGetCategoriesQuery({
      filterBy: "isActive",
      filterValue: "true",
      page: categoriesPage,
      search: categoriesQuery?.length > 0 ? categoriesQuery : "",
    });
  const categoryOptions =
    categoriesResponce?.data.map((item) => ({
      label: item.categoryName,
      value: item.id,
    })) || [];

  const { data: subCategoriesResponce, isFetching: isSubCategoriesLoading } =
    useGetSubCategoriesByIdQuery(
      {
        categoryId,
        filterBy: "isActive",
        filterValue: "true",
        page: subCategoriesPage,
        search: subCategoriesQuery?.length > 0 ? subCategoriesQuery : "",
      },
      { skip: !categoryId }
    );

  const subCategoryOptions = Array.isArray(
    subCategoriesResponce?.data?.subcategories
  )
    ? subCategoriesResponce.data.subcategories.map((item) => ({
        label: item.categoryName,
        value: item.id,
      }))
    : [];

  const { data: routeClassList } = useGetRouteClassListQuery();
  const routeClassOptions =
    routeClassList?.data.map((routeClass) => ({
      label: routeClass.routeClass,
      value: routeClass.id,
    })) || [];

  const { data: routeTypeList } = useGetRouteTypeListQuery();
  const routeTypeOptions =
    routeTypeList?.data.map((routeType) => ({
      label: routeType.routeType,
      value: routeType.id,
    })) || [];

  const { data: routeZipCodeList } = useGetZipCodeListQuery();
  const zipCodeOptions = (routeZipCodeList?.data || []).map((item) => ({
    label: item?.zipCode,
    value: item?.zipCode,
  }));

  const { data: categoryList, pagination: categoriesPagination } =
    categoriesResponce || {};
  const { data: subCategoriesList, pagination: SubCategoriesPagination } =
    subCategoriesResponce || {};

  useEffect(() => {
    if (categoryList) {
      const newVal = categoryList?.map((category) => ({
        label: category?.categoryName,
        value: category?.id,
      }));
      if (categoriesQuery) {
        setCategories(() => [...newVal]);
      } else {
        setCategories((prev) => [...prev, ...newVal]);
      }
    }
  }, [categoryList]);

  useEffect(() => {
    if (subCategoriesList) {
      const newVal = subCategoriesList?.subcategories?.map((subcategory) => ({
        label: subcategory?.subCategoryName,
        value: subcategory?.id,
      }));
      if (subCategoriesQuery) {
        setSubCategories(() => [...newVal]);
      } else {
        setSubCategories((prev) => [...prev, ...newVal]);
      }
    }
  }, [subCategoriesList, subCategoriesList?.length]);

  useEffect(() => {
    if (subCategoryName) {
      setSubCategoriesQuery(subCategoryName);
    }
  }, [subCategoryName]);

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
    subCategoryId,
  });
  const productList = productListData?.data;

  const OnLoadMore = () => {
    if (isFetching) return;
    setQueryParams((prev) => ({
      ...prev,
      page: prev.page + 1,
      limit: 12,
    }));
  };

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

  const handleSelect = (productId) => {
    setCheckedItems((prev) => {
      const isChecked = prev?.includes(productId);
      const updatedCheckedItems = isChecked
        ? prev?.filter((id) => id !== productId)
        : [...prev, productId];
      return updatedCheckedItems;
    });
  };

  const today = new Date();
  const twoMonthsFromNow = new Date();
  twoMonthsFromNow?.setMonth(today?.getMonth() + 2);

  const handleDateChange = (date) => {
    if (date) {
      const formattedDate = date?.toISOString()?.split("T")[0];
      setSelectedDates((prevDates) =>
        prevDates?.includes(formattedDate)
          ? prevDates?.filter((d) => d !== formattedDate)
          : [...prevDates, formattedDate]
      );
    }
  };
  // console.log("productList?.length", productList?.length);

  // console.log(
  //   "routeClass",
  //   routeClass === 4 && (routeType === 2 || routeType === 1) ? true : false
  // );

  return (
    <div className="px-4 pb-5 mx-auto w-full">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="w-full bg-mainContainer sticky z-[40] mt-5 flex justify-between my-6 items-center">
        <label className="text-font24  leading-lineHeight36 font-bold flex-start">{mode === "create" ? "Create Delivery Routes" : "Edit Delivery Routes"}</label>

          <div className="flex gap-3.5">
            <CustomButton
              onClick={() => router.back()}
              className="py-2 px-6 border border-gray-light rounded-lg bg-white text-black font-semibold"
            >
              Cancel
            </CustomButton>
            <CustomButton
              loading={isLoading}
              className="bg-primaryBtn text-white py-2 px-7 rounded-lg border-none"
              type="submit"
            >
              Save
            </CustomButton>
          </div>
        </div>
        <Container>
          <div className="grid grid-cols-2 gap-2">
            <div className="inline-block w-full">
              <Controller
                name="routeCode"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <div className="col-span-4">
                    <CustomInput
                      type="text"
                      placeholder="Enter Code"
                      label="Route Code"
                      labelPlacement="outside"
                      isInvalid={isValid("routeCode", errors)}
                      errorMessage="Please enter Route Code"
                      {...field}
                    />
                  </div>
                )}
              />
            </div>
            <div className=" inline-block w-full mt-4">
              <Controller
                name="routeClassId"
                control={control}
                rules={{ required: true }}
                render={({ field }) =>
                  setRouteClass(field?.value) || (
                    <GlobalDropdown
                      field={field}
                      options={routeClassOptions}
                      isMulti={false}
                      placeholder="Route Class"
                      label="Route Class"
                      name="routeClassId"
                      labelStyle={"dropLabel"}
                      errors={errors}
                      errorMessage="Please select Route Class"
                      required={true}
                    />
                  )
                }
              />
            </div>
          </div>
          <div className="flex w-full gap-2">
            <div className="w-full flex">
              <Controller
                name="routeDescription"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please enter delivery fee",
                  },
                }}
                render={({ field }) => (
                  <div className="w-full mt-3">
                    <CustomTextArea
                      type="text"
                      placeholder="Route Description"
                      label="Enter Description"
                      labelPlacement="outside"
                      isInvalid={isValid("routeDescription", errors)}
                      errorMessage="Please enter Route Description"
                      {...field}
                    />
                  </div>
                )}
              />
            </div>
            <div className=" flex w-full mt-4">
              <div className="w-full">
                <Controller
                  name="zipCodes"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <>
                      <GlobalDropdown
                        field={field}
                        options={zipCodeOptions}
                        isMulti={true}
                        placeholder="Select Zip Codes"
                        label="Connected Zip Codes"
                        name="zipCodes"
                        labelStyle={"dropLabel"}
                        errors={errors}
                        errorMessage="Please select Zip Codes"
                        required={true}
                      />
                    </>
                  )}
                />
              </div>
              <div className="mt-5 ml-2 w-3/4">
                <Controller
                  name="image"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <FilePicker
                      label="Upload CSV"
                      className="h-20"
                      folderName="bundle"
                      // imageUrl={image?.imageurl || ""}
                      // onSuccess={(imageurl, originalUrl) => {
                      //   field.onChange({ imageurl, originalUrl });
                      // }}
                      // onClose={() => {
                      //   field.onChange(null);
                      // }}
                      isInvalid={errors["image"]}
                      errorMessage={
                        errors["image"] ? "Please upload brand image" : ""
                      }
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 align-center">
            <div className="mt-4">
              <Controller
                name="routeTypeId"
                control={control}
                rules={{ required: true }}
                render={({ field }) =>
                  setRouteType(field?.value) || (
                    <GlobalDropdown
                      field={field}
                      options={routeTypeOptions}
                      isMulti={false}
                      placeholder="Select Route Type"
                      label="Route Type"
                      name="routeTypeId"
                      labelStyle={"dropLabel"}
                      errors={errors}
                      errorMessage="Please select Route Type"
                      required={true}
                    />
                  )
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className=" inline-block w-full">
              <Controller
                name="teamName"
                control={control}
                rules={{
                  required: {
                    value: false,
                    message: "Please enter Team name",
                  },
                }}
                render={({ field }) => (
                  <div className="col-span-4">
                    <CustomInput
                      type="text"
                      placeholder="Team name"
                      label="Delivery/Install Team Name"
                      labelPlacement="outside"
                      isInvalid={isValid("teamName", errors)}
                      {...field}
                      isRequired={false}
                    />
                  </div>
                )}
              />
            </div>
          </div>
        </Container>
        <label className="font-semibold">Days Active</label>
        <Container className="my-4">
          <div className="">
            <div className="flex gap-10 mt-3">
              {getValues("daysActive")?.map((item, index) => (
                <Controller
                  key={item.id}
                  name={`daysActive[${index}].isActive`}
                  control={control}
                  render={({ field }) => (
                    <CustomCheckbox
                      label={item.name}
                      isSelected={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              ))}
            </div>
            <div className="flex align-center gap-5 mt-12">
              <label className="col-span-2 ">Show Calendar to Customer:</label>
              <div className="flex gap-2 w-[10%]">
                <label>No</label>
                <Controller
                  name="showCalendarToCustomer"
                  control={control}
                  render={({ field }) => (
                    <Toggle
                      label=""
                      isSelected={field?.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  )}
                />
                <label>Yes</label>
              </div>
            </div>

            {watch("showCalendarToCustomer") && (
              <div className="multi-date-picker-container flex mt-5 gap-20">
                <DatePicker
                  selected={null}
                  onChange={handleDateChange}
                  inline
                  minDate={today}
                  maxDate={twoMonthsFromNow}
                  monthsShown={2}
                  dayClassName={(date) =>
                    selectedDates?.includes(date?.toISOString()?.split("T")[0])
                      ? "selected-date"
                      : undefined
                  }
                />
              </div>
            )}
          </div>
        </Container>
        <label className="font-semibold">Valid Items</label>
        <Container className="my-4">
          <div className="grid grid-cols-2 gap-4 z-index: 5">
            <Controller
              name="categoryId"
              control={control}
              rules={{ required: false }}
              render={({ field }) =>
                setCategory(field.value) || (
                  <GlobalDropdown
                    field={field}
                    options={categoryOptions}
                    isMulti={false}
                    placeholder="E.g. Refrigerator"
                    label="Category"
                    name="categoryId"
                    errors={errors}
                    labelStyle={"dropLabel"}
                    errorMessage="Please select category"
                    required={false}
                  />
                )
              }
            />
            <Controller
              name="subCategoryId"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <GlobalDropdown
                  field={field}
                  options={subCategoryOptions}
                  isMulti={false}
                  placeholder="E.g. French Door Refrigerator"
                  label="Sub-Category"
                  name="subCategoryId"
                  labelStyle={"dropLabel"}
                  errors={errors}
                  errorMessage="Please select category"
                  required={false}
                />
              )}
            />
            <div>
              <label className="dropLabel">Search product</label>

              <input
                placeholder="Search by Product Name or SKU"
                className="p-2 border border-gray-300 rounded mb-4 mt-2 GlobarSearchStyle"
                onChange={(e) => debouncedHandleSearch(e.target.value)}
              />
            </div>
          </div>
          <div id="scrollableDiv" className="h-[400px] overflow-y-auto">
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
                <label className="font-semibold text-lg">Product List</label>
                {productList?.length > 0 ? (
                  productList.map((product) => (
                    <div key={product.id} className="p-4 border_gray">
                      <div className="flex items-center space-x-4">
                        <Checkbox
                          label=""
                          isSelected={checkedItems?.includes(product?.id)}
                          value={checkedItems?.includes(product?.id)}
                          checked={checkedItems?.includes(product?.id)}
                          onChange={() => handleSelect(product?.id)}
                        />
                        <div>
                          <h3 className="font-semibold text-lg">
                            {product.ProductName}
                          </h3>
                          <p className="text-sm text-gray-600">
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
        </Container>
        <label className="font-semibold">Delivery fee</label>
        <Container className="my-4">
          <div className="inline-block w-[50%]">
            <Controller
              name="deliveryFee"
              control={control}
              rules={{
                required: {
                  value: disableDeliveryFee ? false : true,
                  message: "Please enter delivery fee",
                },
                validate: (value) => !isNaN(value) || "Value must be a number",
              }}
              render={({ field }) => (
                <div className="col-span-4">
                  <CustomInput
                    type="number"
                    placeholder={
                      disableDeliveryFee
                        ? "Not applicable/Disabled"
                        : "Enter fee"
                    }
                    label="Delivery Fee:"
                    disabled={disableDeliveryFee}
                    labelPlacement="outside"
                    isInvalid={isValid("deliveryFee", errors)}
                    errorMessage="Please enter delivery fee"
                    {...field}
                  />
                  {disableDeliveryFee && (
                    <label className="dropLabel flex mt-3">
                      Note: The delivery fee is not applicable for your Route
                      Class and Route Type.
                    </label>
                  )}
                </div>
              )}
            />
          </div>
        </Container>
      </form>
    </div>
  );
};

export default DeliveryRoutesWrapper;
