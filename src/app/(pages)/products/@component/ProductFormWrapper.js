import CustomButton from "@/components/commonComponents/Button/Button";
import HeaderButtons from "@/components/table/HeaderButtons";
import { useRouter } from "next/navigation";
import BasicProductDetailContainer from "../@component/basicProductDetailContainer";
import ProductFeatureContainer from "../@component/productFeatureContainer";
import ProductFlagsContainer from "../@component/productFlagsContainer";
import ProductHighlightsContainer from "../@component/productHighlightsContainer";
import ProductManualContainer from "../@component/productManualContainer";
import ProductOverviewContainer from "../@component/productOverviewContainer";
import ProductPriceContainer from "../@component/productPriceContainer";
import ProductSpecificationContainer from "../@component/productSpecificationContainer";

const ProductFormWrapper = ({
  handleSubmit,
  control,
  getValues,
  setValue,
  watch,
  formState: { errors },
  onSubmit,
  mode,
  onCancel = () => {},
}) => {
  const router = useRouter();
  return (
    <div className="px-4 pb-5 mx-auto w-full">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className=" w-full bg-mainContainer sticky top-[64px] z-[40]">
          <HeaderButtons
            headerButtons={
              <div className="flex gap-3.5">
                <CustomButton
                  onClick={() => router.back()}
                  className=" py-2 px-6 border border-gray-light rounded-lg bg-white text-black font-semibold"
                >
                  Cancel
                </CustomButton>
                <CustomButton
                  className=" bg-primaryBtn text-white py-2 px-7 rounded-lg border-none"
                  type="submit"
                >
                  {mode === "edit" ? "Update" : "Save"}
                </CustomButton>
              </div>
            }
          />
        </div>
        <div className="  pr-[5px] rounded-[0.75rem] relative">
          <div className="grid grid-cols-350 gap-4 items-start">
            <div className=" shadow-main rounded">
              <BasicProductDetailContainer
                control={control}
                setValue={setValue}
                watch={watch}
                errors={errors}
                getValues={getValues}
              />

              <ProductHighlightsContainer
                getValues={getValues}
                setValue={setValue}
                watch={watch}
              />

              <ProductPriceContainer
                control={control}
                errors={errors}
                watch={watch}
              />

              <ProductFeatureContainer
                getValues={getValues}
                setValue={setValue}
                watch={watch}
              />

              <ProductOverviewContainer
                getValues={getValues}
                setValue={setValue}
                watch={watch}
              />

              <ProductSpecificationContainer
                getValues={getValues}
                setValue={setValue}
                watch={watch}
                mode={mode}
              />

              <ProductManualContainer
                control={control}
                watch={watch}
                errors={errors}
              />
            </div>

            <ProductFlagsContainer
              control={control}
              getValues={getValues}
              setValue={setValue}
              watch={watch}
              errors={errors}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductFormWrapper;
