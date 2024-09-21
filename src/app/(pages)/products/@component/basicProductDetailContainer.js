import Container from "@/components/commonComponents/Container/Container";
import MultipleFilePicker from "@/components/commonComponents/FilePicker/MultipleFilePicker";
import GlobalDropdown from "@/components/commonComponents/GlobalDropdown/GlobalDropdown";
import CustomInput from "@/components/commonComponents/TextInput/TextInput";
import { Title } from "@/components/commonComponents/Titles/Titles";
import Toggle from "@/components/commonComponents/Toggle/Toggle";
import { useGetBrandsQuery } from "@/redux/apiSlices/brandsApi";
import { cn, isValid } from "@/utils/common-utils";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

const BasicProductDetailContainer = ({
  control,
  watch,
  setValue,
  errors,
  getValues,
}) => {
  const { productImages, brandId, brandName } = watch();
  const [page, setPage] = useState(1);
  const [brandOptions, setBrandOptions] = useState([]);

  const {
    data: brandData,
    isLoading: isBrandLoading,
    isFetching,
  } = useGetBrandsQuery({
    filterBy: "isActive",
    filterValue: "true",
    page,
  });

  const { data: brandList = [], pagination } = brandData || {};

  useEffect(() => {
    if (brandList?.length > 0) {
      const newOptions = brandList.map((brand) => ({
        label: brand?.brandName,
        value: brand?.id,
      }));
      setBrandOptions((prev) => [...prev, ...newOptions]);
    }
  }, [brandList]);

  return (
    <Container>
      <Controller
        name="productName"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <CustomInput
            type="text"
            placeholder="E.g. BOSCH 20.8 cu ft French Door Refrigerator "
            label="Product Title"
            labelPlacement="outside"
            isInvalid={isValid("productName", errors)}
            errorMessage="Please enter product name"
            {...field}
          />
        )}
      />

      <div className="mt-4 grid grid-cols-1 gap-10 ">
        <div>
          <Title
            className={cn(
              "text-sm font-normal text-gray-2 mb-2",
              // errors?.productImages?.[index]?.imageurl ? "text-error" : ""
            )}
          >
            Product Image<span className="text-error"> *</span>
          </Title>
          <Controller
            name={`productImages`}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <MultipleFilePicker
                label="Upload Product Images"
                className="h-[130px]"
                folderName="Product"
                setValue={setValue}
                // watch={watch}
                imageUrl={productImages?.length > 0 ? [...productImages] : []}
                onChange={(imageurl, originalUrl = "") =>  {
                  console.log("imageurl", imageurl)
                  field.onChange(imageurl);
                  // const images = getValues("productImages");
                }}
                // onClose={(index) => {
                //   const images = getValues("productImages");
                //   const updatedImages = images?.filter(
                //     (_, imgIndex) => imgIndex !== index
                //   ); // Filter out the image with the matching index
                //   setValue("productImages", updatedImages);
                // }}
                isInvalid={errors?.productImages?.[index]?.imageurl}
                errorMessage={"Please upload product images"}
                {...field}
              />
            )}
          />
        </div>
      </div>

      <Controller
        name="sku"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <CustomInput
            type="text"
            placeholder="E.g. GFD65ESSVWW"
            label="SKU"
            labelPlacement="outside"
            isInvalid={isValid("sku", errors)}
            errorMessage="Please enter sku "
            {...field}
          />
        )}
      />

      <div className="mt-4 flex w-full justify-between">
        <Controller
          name="brandId"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <GlobalDropdown
              field={field}
              options={brandOptions}
              isMulti={false}
              placeholder="E.g. Samsung"
              label="Brand"
              labelStyle={"dropLabel"}
              name="brandId"
              errors={errors}
              errorMessage="Please select brand"
              required={true}
              onLoadMore={() => setPage((prev) => prev + 1)}
              hasMoreData={pagination?.hasNextPage}
              isLoading={isBrandLoading || isFetching}
            />
          )}
        />
      </div>
      <div className="mt-4 grid grid-cols-2 grid-rows-1 gap-6 ">
        <Controller
          name="upcCode"
          control={control}
          render={({ field }) => (
            <CustomInput
              type="text"
              placeholder="E.g. 124796"
              label="UPC Code"
              labelPlacement="outside"
              isRequired={false}
              {...field}
            />
          )}
        />
        <Controller
          name="quantity"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Please enter quantity",
            },
            max: {
              value: 9999,
              message: "Quantity cannot exceed 9999",
            },
            min: {
              value: 100,
              message: "Minimum quantity must be greater than 100",
            },
          }}
          render={({ field }) => (
            <CustomInput
              type="text"
              placeholder="E.g. 100"
              label="Quantity"
              labelPlacement="outside"
              isInvalid={isValid("quantity", errors)}
              errorMessage={errors.quantity?.message || ""}
              {...field}
            />
          )}
        />
      </div>
      <div className=" flex w-[50%] justify-between mt-4">
        <Controller
          name="isInStock"
          control={control}
          render={({ field }) => (
            <Toggle
              label="Product"
              startText="InStock"
              {...field}
              isSelected={field.value}
            />
          )}
        />
      </div>
      <div className=" flex w-[50%] justify-between mt-4">
        <Controller
          name="isWifiEnabled"
          control={control}
          render={({ field }) => (
            <Toggle
              label="Wifi Enabled"
              startText="Yes"
              {...field}
              isSelected={field.value}
            />
          )}
        />
      </div>
    </Container>
  );
};

export default BasicProductDetailContainer;
