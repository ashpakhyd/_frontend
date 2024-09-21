import React, { useEffect, useState } from "react";
import Container from "@/components/commonComponents/Container/Container";
import { Title } from "@/components/commonComponents/Titles/Titles";
import Toggle from "@/components/commonComponents/Toggle/Toggle";
import { Controller } from "react-hook-form";
import { useGetCategoriesQuery } from "@/redux/apiSlices/categoriesApi";
import { useGetSubCategoriesByIdQuery } from "@/redux/apiSlices/subCategoriesApi";
import { isValid } from "@/utils/common-utils";
import GlobalDropdown from "@/components/commonComponents/GlobalDropdown/GlobalDropdown";

const statusOptions = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
  { label: "C", value: "C" },
  { label: "D", value: "D" },
  { label: "O", value: "O" },
  { label: "S", value: "S" },
];

const ProductFlagsContainer = ({ control, watch, errors, setValue }) => {
  return (
    <div>
      <Container>
        <Title className="mb-4">Status</Title>
        <Controller
          name="status"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <GlobalDropdown
              field={field}
              options={statusOptions}
              isMulti={false}
              placeholder="E.g. A"
              label="Status"
              name="status"
              labelStyle={"dropLabel"}
              errors={errors}
              errorMessage="Please select status"
              required={true}
            />
          )}
        />
      </Container>

      <Container>
        <Title className="mb-2">Website Status</Title>
        <div className="mt-4 w-full  grid grid-cols-1 grid-rows-6 gap-8">
          <Controller
            name="websiteActive"
            control={control}
            render={({ field }) => (
              <Toggle
                label="Website Active"
                startText="Inactive"
                {...field}
                isSelected={field.value}
              />
            )}
          />
          <Controller
            name="floorMatrix"
            control={control}
            render={({ field }) => (
              <Toggle
                label="Floor Matrix"
                startText="No"
                {...field}
                isSelected={field.value}
              />
            )}
          />
          <Controller
            name="saleOnWebsite"
            control={control}
            render={({ field }) => (
              <Toggle
                label="Sale On Website"
                startText="Inactive"
                {...field}
                isSelected={field.value}
              />
            )}
          />
          <Controller
            name="webPriceInactive"
            control={control}
            render={({ field }) => (
              <Toggle
                label="Web Price "
                startText="Inactive"
                {...field}
                isSelected={field.value}
              />
            )}
          />
          <Controller
            name="websiteOutlet"
            control={control}
            render={({ field }) => (
              <Toggle
                label="Website Outlet "
                startText="Inactive"
                {...field}
                isSelected={field.value}
              />
            )}
          />
        </div>
      </Container>

      <ProductOrganizationContainer
        control={control}
        watch={watch}
        errors={errors}
        setValue={setValue}
      />

      <Container>
        <Title className="mb-2">Offers</Title>
        <div className="mt-4 w-full  grid grid-cols-1 grid-rows-4 gap-8">
          <Controller
            name="bestSeller"
            control={control}
            render={({ field }) => (
              <Toggle
                label="Best Seller"
                startText="Inactive"
                {...field}
                isSelected={field.value}
              />
            )}
          />
          {/* <Controller
            name="rank"
            control={control}
            render={({ field }) => (
              <Toggle
                label="Rank"
                startText="Inactive"
                {...field}
                isSelected={field.value}
              />
            )}
          /> */}
          <Controller
            name="specialBuy"
            control={control}
            render={({ field }) => (
              <Toggle
                label="Special Buy"
                startText="Inactive"
                {...field}
                isSelected={field.value}
              />
            )}
          />
          <Controller
            name="customPromotion"
            control={control}
            render={({ field }) => (
              <Toggle
                label="Custom Promotion"
                startText="Inactive"
                isSelected={field.value}
                {...field}
              />
            )}
          />
        </div>
      </Container>

      <Container>
        <div className="w-full  grid grid-cols-1 grid-rows-4 gap-8">
          <Controller
            name="defaultAppliance"
            control={control}
            render={({ field }) => (
              <Toggle
                label="Default Appliance"
                startText="Inactive"
                isSelected={field.value}
                {...field}
              />
            )}
          />
          <Controller
            name="implementWebSeeSalePriceInCart"
            control={control}
            render={({ field }) => (
              <Toggle
                label="Web See Sale Price In Cart"
                startText="No"
                isSelected={field.value}
                {...field}
              />
            )}
          />
          <Controller
            name="implementWebPdpCartMapOnly"
            control={control}
            render={({ field }) => (
              <Toggle
                label="Web PDP & Cart MAP Only"
                startText="No"
                isSelected={field.value}
                {...field}
              />
            )}
          />
          <Controller
            name="implementWebPdpCartSalePriceOnly"
            control={control}
            render={({ field }) => (
              <Toggle
                label="Web PDP & Cart Sale Price Only "
                startText="No"
                isSelected={field.value}
                {...field}
              />
            )}
          />
          <Controller
            name="implementWebsiteLoginSeeSalePrice"
            control={control}
            render={({ field }) => (
              <Toggle
                label="Website Login to See Sale Price  "
                startText="No"
                isSelected={field.value}
                {...field}
              />
            )}
          />
          <Controller
            name="implementWebTradePartnerPrice"
            control={control}
            render={({ field }) => (
              <Toggle
                label="Web trade Partner Price  "
                startText="No"
                isSelected={field.value}
                {...field}
              />
            )}
          />
        </div>
      </Container>
    </div>
  );
};

export default ProductFlagsContainer;

const ProductOrganizationContainer = ({ control, errors, watch, setValue }) => {
  const {
    categoryId,
    categoryName,
    subCategoryName,
    subCategoryId,
    subcategory2,
  } = watch();
  const [categoriesPage, setCategoriesPage] = useState(1);
  const [subCategoriesPage, setSubCategoriesPage] = useState(1);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const { data: categoriesData, isFetching: isCategoriesFetching } =
    useGetCategoriesQuery({
      filterBy: "isActive",
      filterValue: "true",
      page: categoriesPage,
    });

  useEffect(() => {
    if (categoriesData?.data) {
      const newOptions = categoriesData.data.map((cat) => ({
        label: cat.categoryName,
        value: cat.id,
      }));
      setCategoryOptions((prev) => [...prev, ...newOptions]);
    }
  }, [categoriesData]);

  const { data: subCategoriesResponce, isFetching: isSubCategoriesLoading } =
  useGetSubCategoriesByIdQuery(
    {
      categoryId,
      filterBy: "isActive",
      filterValue: "true",
      page: subCategoriesPage,
    },
    { skip: !categoryId }
  );

const subCategoryOptions = Array.isArray(
  subCategoriesResponce?.data?.subcategories
)
  ? subCategoriesResponce?.data?.subcategories?.map((item) => ({
      label: item.categoryName,
      value: item.id,
    }))
  : [];

  return (
    <Container>
      <Title>Product organization</Title>
      <div className="mt-4">
        <Controller
          name="categoryId"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <GlobalDropdown
              field={field}
              options={categoryOptions}
              placeholder="Select Category"
              label="Category"
              errors={errors}
              errorMessage="Please select a category"
              isLoading={isCategoriesFetching}
              onLoadMore={() => setCategoriesPage((prev) => prev + 1)}
              hasMoreData={categoriesData?.pagination?.hasNextPage}
            />
          )}
        />
      </div>
      <div className="mt-4">
        <Controller
          name="subCategoryId"
          control={control}
          rules={{ required: !!categoryId }}
          render={({ field }) => (
            <GlobalDropdown
              field={field}
              options={subCategoryOptions}
              placeholder="Select Sub-Category"
              label="Sub-Category"
              isDisabled={!categoryId}
              errors={errors}
              errorMessage="Please select a sub-category"
              isLoading={isSubCategoriesLoading}
            />
          )}
        />
      </div>

      {subCategoryId &&
        subCategoriesResponce.data.subcategories?.find(
          (cat) => Number(cat.id) === Number(subCategoryId)
        )?.subCategoryCounts2 > 0 && (
          <SubCategory2Container
            subCategoryId={subCategoryId}
            control={control}
            errors={errors}
            watch={watch}
          />
        )}
    </Container>
  );
};

const SubCategory2Container = ({ subCategoryId, control, errors, watch }) => {
  const [subCategoriesPage, setSubCategoriesPage] = useState(1);

  const { data: subCategoriesData, isFetching: isSubCategoriesFetching } =
    useGetSubCategoriesByIdQuery(
      {
        categoryId: subCategoryId,
        filterBy: "isActive",
        filterValue: "true",
        page: subCategoriesPage,
      },
      { skip: !subCategoryId }
    );

  const subCategory2Options = Array.isArray(
    subCategoriesData?.data?.subcategories
  )
    ? subCategoriesData?.data?.subcategories?.map((item) => ({
        label: item?.subCategoryName,
        value: item?.id,
      }))
    : [];

  return (
    <div className="mt-4">
      <Controller
        name="subcategory2"
        control={control}
        render={({ field }) => (
          <GlobalDropdown
            field={field}
            options={subCategory2Options}
            placeholder="Select Sub-Category 2"
            label="Sub-Category 2"
            errors={errors}
            errorMessage="Please select a sub-category 2"
            isLoading={isSubCategoriesFetching}
          />
        )}
      />
    </div>
  );
};
