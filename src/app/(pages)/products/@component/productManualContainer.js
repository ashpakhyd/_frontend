import React from "react";
import Container from "@/components/commonComponents/Container/Container";
import FilePicker from "@/components/commonComponents/FilePicker/FilePicker";
import CustomInput from "@/components/commonComponents/TextInput/TextInput";
import { Title } from "@/components/commonComponents/Titles/Titles";
import { Controller, useFieldArray } from "react-hook-form";
import CustomButton from "@/components/commonComponents/Button/Button";
import PlusIcon from "@/components/icons/PlusIcon";
import CrossIcon from "@/components/icons/CrossArrowIcon";
import Pdf from "@/public/pdf.png";
import { isValid } from "@/utils/common-utils";

export const ProductManualContainer = ({ control, watch, errors }) => {
  const { productManualGuide } = watch();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "productManualGuide",
  });

  return (
    <Container>
      <Title className="mb-6">Manual & Guides</Title>
      {fields.map((item, index) => (
        <div key={index}>
          <div className="flex">
            <Controller
              name={`productManualGuide[${index}].fileName`}
              control={control}
              rules={{
                required: !!(
                  productManualGuide?.length > 0 &&
                  productManualGuide[index].fileURL
                ),
              }}
              defaultValue={item.fileName}
              render={({ field }) => (
                <CustomInput
                  className="w-full"
                  type="text"
                  isRequired={false}
                  placeholder="E.g. Product Specification Sheet"
                  label={"Title " + (index + 1)}
                  labelPlacement="outside"
                  isInvalid={!!errors?.productManualGuide?.[index]?.fileName}
                  errorMessage="Please enter PDF title"
                  {...field}
                />
              )}
            />
            {fields.length > 1 && (
              <div
                className="pt-7 flex self-center"
                onClick={() => remove(index)}
              >
                <CrossIcon />
              </div>
            )}
          </div>
          <div className="flex flex-col-2 mt-5">
            <div
              className={`flex items-center p-4 rounded-lg border-2 border-dashed ${
                !!errors?.productManualGuide?.[index]?.fileURL
                  ? "border-error"
                  : " border-gray-9"
              }`}
            >
              <Controller
                name={`productManualGuide[${index}].fileURL`}
                control={control}
                rules={{
                  required: !!(
                    productManualGuide?.length > 0 &&
                    productManualGuide[index].fileName
                  ),
                  // rules={{
                  //   required: !!(
                  //     productManualGuide?.length > 0 &&
                  //     productManualGuide[index].fileURL
                  //   ),
                  // }}
                }}
                render={({ field }) => (
                  <FilePicker
                    className="border-none p-0 h-35 w-[138px] items-start"
                    label="Add PDF’s"
                    hideFiles={true}
                    hideDragLine={true}
                    accept="application/pdf"
                    folderName="Product Manual & Guides"
                    imageUrl={
                      productManualGuide?.length > 0 &&
                      productManualGuide[index].fileURL
                        ? Pdf.src
                        : ""
                    }
                    isInvalid={!!errors?.productManualGuide?.[index]?.fileURL}
                    errorMessage="Please upload a PDF file"
                    previewWidth={50}
                    previewHeight={50}
                    onSuccess={(imageurl) => field.onChange(imageurl)}
                    onClose={() => field.onChange("")}
                    {...field}
                  />
                )}
              />
              <p className="text-gray-6 text-sm">Or drag and drop files</p>
            </div>
          </div>
        </div>
      ))}
      <div className="w-full flex pt-5 justify-start items-center mt-0">
        <CustomButton
          startContent={<PlusIcon fill="#1E5EFF" />}
          className="border-none text-blue-1"
          onClick={() => append({ fileName: "", fileURL: "" })}
        >
          Add more
        </CustomButton>
      </div>
    </Container>
  );
};

export default ProductManualContainer;
