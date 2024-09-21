import React, { useState } from "react";
import CustomButton from "@/components/commonComponents/Button/Button";
import Container from "@/components/commonComponents/Container/Container";
import GlobalDropdown from "@/components/commonComponents/GlobalDropdown/GlobalDropdown";
import { Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { isValid } from "@/utils/common-utils";
import { useGetCategoriesQuery } from "@/redux/apiSlices/categoriesApi";
import { useGetSubCategoriesByIdQuery } from "@/redux/apiSlices/subCategoriesApi";
import CustomInput from "@/components/commonComponents/TextInput/TextInput";
import CustomTextArea from "@/components/commonComponents/TextArea/TextArea";

const addonsOptions = [
  { label: "Installation", value: "installation" },
  { label: "Additional", value: "additional" },
];
const AddonsFormWrapper = ({
  onSubmit,
  handleSubmit,
  control,
  errors,
  watch,
  isLoading,
  getValues,
  mode,
}) => {
  const router = useRouter();
  const { categoryId, subCategoryId } = watch();
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
        <label className="text-font24  leading-lineHeight36 font-bold flex-start">{mode === "create" ? "Create Addon" : "Edit Addon"}</label>
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
        {/* <label className="text-xl font-bold">Create Addon</label> */}

        <Container>
          <div className="grid grid-cols-2 gap-4 z-index: 5">
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
          <div className="grid grid-cols-2 gap-4 mt-1">
            <div className="inline-block w-full">
              <Controller
                name="sku"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <div className="col-span-4">
                    <CustomInput
                      type="text"
                      placeholder="Enter SKU"
                      label="SKU"
                      labelPlacement="outside"
                      isInvalid={isValid("sku", errors)}
                      errorMessage="Please enter SKU"
                      {...field}
                    />
                  </div>
                )}
              />
            </div>
            <div className=" inline-block w-full mt-4">
              <Controller
                name="serviceType"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <GlobalDropdown
                    field={field}
                    options={addonsOptions}
                    isMulti={false}
                    placeholder="Addon"
                    label="Addon"
                    name="serviceType"
                    labelStyle={"dropLabel"}
                    errors={errors}
                    errorMessage="Please select Addon"
                    required={true}
                  />
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="inline-block w-full">
              <Controller
                name="name"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <div className="col-span-4">
                    <CustomInput
                      type="text"
                      placeholder="Enter Name"
                      label="Name"
                      labelPlacement="outside"
                      isInvalid={isValid("name", errors)}
                      errorMessage="Please enter Name"
                      {...field}
                    />
                  </div>
                )}
              />
            </div>
            <div className="inline-block w-full">
              <Controller
                name="price"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <div className="col-span-4">
                    <CustomInput
                      type="number"
                      placeholder="Enter Price"
                      label="Price"
                      labelPlacement="outside"
                      isInvalid={isValid("price", errors)}
                      errorMessage="Please enter Price"
                      {...field}
                    />
                  </div>
                )}
              />
            </div>
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
        
        </Container>
      </form>
    </div>
  );
};

export default AddonsFormWrapper;
