import { useRouter } from "next/navigation";
import React, { useState } from "react";
import HeaderButtons from "@/components/table/HeaderButtons";
import CustomButton from "@/components/commonComponents/Button/Button";
import { PopUpModal } from "@/components/commonComponents/Modal/Modal";
import BundlesProductModal from "./BundlesProductModal";
import BundlesPageLeftSection from "./BundlesPageLeftSection";
import BundlesPageRightSection from "./BundlesPageRightSection";
import { Controller } from "react-hook-form";

const BundlesFormWrapper = ({
  handleSubmit,
  control,
  getValues,
  setValue,
  watch,
  formState: { errors },
  onSubmit,
  mode,
  bundleData,
  onCancel = () => {},
  isLoading,
}) => {
  const router = useRouter();
  const [selectedProductsByCategory, setSelectedProductsByCategory] = useState(
    {}
  );
  const [proData, setProData] = useState([])

  return (
    <div className="px-4 pb-5 mx-auto w-full">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="w-full bg-mainContainer sticky top-[64px] z-[40]">
          <HeaderButtons
            headerButtons={
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
                  {mode === "edit" ? "Update" : "Save"}
                </CustomButton>
              </div>
            }
          />
        </div>
        <div className="pr-[5px] rounded-[0.75rem] relative">
          <div className="grid grid-cols-350 gap-4 items-start">
            <div className="shadow-main rounded">
              <BundlesPageLeftSection
                control={control}
                setValue={setValue}
                watch={watch}
                errors={errors}
                getValues={getValues}
                mode={mode}
                setSelectedProductsByCategory={setSelectedProductsByCategory}
                selectedProductsByCategory={selectedProductsByCategory}
                bundleData={bundleData}
                proData={proData}
                setProData={setProData}

              />
            </div>
            <div>
              <BundlesPageRightSection
                control={control}
                getValues={getValues}
                setValue={setValue}
                watch={watch}
                errors={errors}
                image={watch("image")}
                thumbnail={watch("thumbnail")}
                setSelectedProductsByCategory={setSelectedProductsByCategory}
                selectedProductsByCategory={selectedProductsByCategory}
                bundleData={bundleData}
                mode={mode}
                proData={proData}
                setProData={setProData}

              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BundlesFormWrapper;
