import CustomButton from "@/components/commonComponents/Button/Button";
import Container from "@/components/commonComponents/Container/Container";
import GlobalDropdown from "@/components/commonComponents/GlobalDropdown/GlobalDropdown";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import { isValid } from "@/utils/common-utils";
import { useGetCategoriesQuery } from "@/redux/apiSlices/categoriesApi";
import { useGetSubCategoriesByIdQuery } from "@/redux/apiSlices/subCategoriesApi";
import CustomInput from "@/components/commonComponents/TextInput/TextInput";
import CustomTextArea from "@/components/commonComponents/TextArea/TextArea";
import CrossIcon from "@/components/icons/CrossArrowIcon";
import PlusIcon from "@/components/icons/PlusIcon";

const warrantyOptions = [
  { label: "2 Years", value: "2" },
  { label: "3 Years", value: "3" },
  { label: "5 Years", value: "5" },
];

const WarrantyFormWrapper = ({
  onSubmit,
  handleSubmit,
  control,
  errors,
  watch,
  isLoading,
  getValues,
  fields,
  append,
  remove,
  mode,
}) => {
  const router = useRouter();
  const { categoryId, subCategoryId, priceRanges } = watch();

  const [categoriesQuery, setCategoriesQuery] = useState("");
  const { data: categoriesResponce, isFetching: isCategoriesLoading } =
    useGetCategoriesQuery({
      filterBy: "isActive",
      filterValue: "true",
      page: 1,
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
        page: 1,
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

  return (
    <div className="px-4 pb-5 mx-auto w-full">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="w-full bg-mainContainer sticky z-[40] mt-5 flex justify-between my-6 items-center">
        <label className="text-font24  leading-lineHeight36 font-bold flex-start">{mode==="create" ? "Create Warranty" : "Edit Warranty"}</label>
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
          <div className="grid grid-cols-2 gap-4">
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
                  errors={errors}
                  labelStyle={"dropLabel"}
                  errorMessage="Please select category"
                  required={true}
                />
              )}
            />
            <Controller
              name="subCategoryId"
              control={control}
              rules={{ required: true }}
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
                  required={true}
                />
              )}
            />
          </div>

          <div className="w-full flex">
            <Controller
              name="description"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter Description",
                },
              }}
              render={({ field }) => (
                <div className="w-full mt-3">
                  <CustomTextArea
                    type="text"
                    placeholder="Description"
                    label="Enter Description"
                    labelPlacement="outside"
                    labelClassName={"dropLabel"}
                    isInvalid={isValid("description", errors)}
                    errorMessage="Please enter Description"
                    {...field}
                  />
                </div>
              )}
            />
          </div>

          {fields?.map((item, index) => {
            const selectedWarrantyTypes = priceRanges
              .map((range) => range.warrantyType)
              .filter(Boolean); 
            const filteredWarrantyOptions = warrantyOptions.filter(
              (option) =>
                !selectedWarrantyTypes.includes(option.value) ||
                option.value === priceRanges[index]?.warrantyType
            );
            return (
              <div key={item.id} className="flex w-full gap-2 mt-4">
                <div className="flex-1 mt-4">
                  <Controller
                    name={`priceRanges.${index}.warrantyType`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <GlobalDropdown
                        field={field}
                        options={filteredWarrantyOptions}
                        isMulti={false}
                        placeholder="Select Warranty Type"
                        label="Warranty Type"
                        name={`priceRanges.${index}.warrantyType`}
                        labelStyle={"dropLabel"}
                        errors={!!errors}
                        errorMessage="Please select Warranty Type"
                        required={true}
                      />
                    )}
                  />
                </div>
                <div className="flex-1">
                  <Controller
                    name={`priceRanges.${index}.priceMin`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <CustomInput
                        type="number"
                        placeholder="Min Price"
                        label="Min Price"
                        labelPlacement="outside"
                        isInvalid={!!errors?.priceRanges?.[index]?.priceMin}
                        errorMessage="Please enter Min Price"
                        {...field}
                      />
                    )}
                  />
                </div>
                <div className="flex-1">
                  <Controller
                    name={`priceRanges.${index}.priceMax`}
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <CustomInput
                        type="number"
                        placeholder="Max Price"
                        label="Max Price"
                        labelPlacement="outside"
                        isInvalid={!!errors?.priceRanges?.[index]?.priceMax}
                        errorMessage={
                          errors?.priceRanges?.[index]?.priceMax?.message ||
                          "Please enter Max Price"
                        }
                        {...field}
                      />
                    )}
                  />
                </div>
                <div className="flex-1">
                  <Controller
                    name={`priceRanges.${index}.warrantyPrice`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <CustomInput
                        type="number"
                        placeholder="Enter Price"
                        label="Price"
                        labelPlacement="outside"
                        isInvalid={
                          !!errors?.priceRanges?.[index]?.warrantyPrice
                        }
                        errorMessage="Please enter Price"
                        {...field}
                      />
                    )}
                  />
                </div>
                {fields?.length > 1 && (
                  <div
                    className="content-center pt-3"
                    onClick={() => remove(index)}
                  >
                    <CrossIcon />
                  </div>
                )}
              </div>
            );
          })}

          {fields?.length < 3 && (
            <CustomButton
              startContent={<PlusIcon fill="#1E5EFF" />}
              className="border-none text-blue-1"
              onClick={() =>
                append({
                  warrantyType: "",
                  priceMin: "",
                  priceMax: "",
                  warrantyPrice: "",
                })
              }
            >
              {fields?.length > 0 ? "Add more warranty" : "Add Warranty"}
            </CustomButton>
          )}
        </Container>
      </form>
    </div>
  );
};

export default WarrantyFormWrapper;
