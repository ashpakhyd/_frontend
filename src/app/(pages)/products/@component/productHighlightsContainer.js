import React from "react";
import CustomButton from "@/components/commonComponents/Button/Button";
import Container from "@/components/commonComponents/Container/Container";
import { PopUpModal } from "@/components/commonComponents/Modal/Modal";
import { Title } from "@/components/commonComponents/Titles/Titles";
import PlusIcon from "@/components/icons/PlusIcon";
import CrossIcon from "@/components/icons/CrossArrowIcon";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Tooltip } from "@nextui-org/react";
import { EditIconUnderlined } from "@/components/icons/EditIconUnderlined";
import CustomTextArea from "@/components/commonComponents/TextArea/TextArea";

const ProductHighlightsContainer = ({ setValue, getValues, watch }) => {
  const { productHighlights } = watch();
  return (
    <Container>
      <div className="flex justify-between items-center">
        <Title>Highlights</Title>

        {productHighlights?.length > 0 && (
          <PopUpModal
            //   size="2xl"
            title={(onOpen) => (
              <Tooltip showArrow={true} content="Edit">
                <span onClick={onOpen} className="cursor-pointer">
                  <EditIconUnderlined fill="#5A607F" />
                </span>
              </Tooltip>
            )}
          >
            {(childrenProps) => (
              <AddHighlightsModel
                {...childrenProps}
                getValues={getValues}
                setValue={setValue}
                mode="edit"
                formData={productHighlights}
              />
            )}
          </PopUpModal>
        )}
      </div>

      {productHighlights?.length > 0 &&
        productHighlights.map(({ highlights }, index) => (
          <li
            key={index}
            className="text-[#5A607F] pb-3 mt-1 font-semibold mb-2 text-sm"
          >
            {highlights}
          </li>
        ))}

      <PopUpModal
        size="2xl"
        title={(onOpen) => (
          <CustomButton
            className="border-none text-blue-1 mt-3"
            onClick={onOpen}
          >
            <PlusIcon fill="#1E5EFF" /> Add Highlights
          </CustomButton>
        )}
      >
        {(childrenProps) => {
          return (
            <AddHighlightsModel
              {...childrenProps}
              getValues={getValues}
              setValue={setValue}
            />
          );
        }}
      </PopUpModal>
    </Container>
  );
};

export default ProductHighlightsContainer;

const AddHighlightsModel = ({
  onClose,
  ModalHeader,
  ModalBody,
  ModalFooter,
  setValue,
  getValues,
  mode = "add",
  formData = [{ highlights: "" }],
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productHighlights: [...formData],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "productHighlights",
  });

  const onSubmit = (data) => {
    const { productHighlights } = data;
    const value = getValues("productHighlights");
    if (mode === "add") {
      setValue("productHighlights", [...value, ...productHighlights]);
    } else {
      setValue("productHighlights", [...productHighlights]);
    }
    onClose();
  };

  return (
    <>
      <ModalHeader>
        <p className="flex flex-col gap-1 font-bold text-md">
          {mode === "add" ? "Add" : "Update"} Highlights
        </p>
      </ModalHeader>
      <ModalBody>
        {fields.map((item, index) => (
          <div key={index} className="flex gap-3 my-0">
            <Controller
              name={`productHighlights[${index}].highlights`}
              control={control}
              rules={{ required: true }}
              defaultValue={item.value}
              render={({ field }) => (
                <CustomTextArea
                  className="mt-4"
                  placeholder="E.g. The Bosch B36CT81ENS is an innovative and stylish counter-depth French door...."
                  label="Highlights"
                  labelPlacement="outside"
                  isInvalid={
                    errors?.productHighlights &&
                    errors?.productHighlights[index]?.highlights
                      ? true
                      : false
                  }
                  errorMessage="Please enter title"
                  {...field}
                />
              )}
            />

            {fields.length > 1 && (
              <div className="content-center" onClick={() => remove(index)}>
                <CrossIcon />
              </div>
            )}
          </div>
        ))}

        <div className="w-full flex pt-5 justify-start items-center mt-0">
          <CustomButton
            startContent={<PlusIcon fill="#1E5EFF" />}
            className="border-none text-blue-1"
            onClick={() => append({ highlights: "" })}
          >
            Add more
          </CustomButton>
        </div>
      </ModalBody>
      <ModalFooter>
        <CustomButton variant="bordered" onClick={onClose}>
          Cancel
        </CustomButton>
        <CustomButton
          className=" text-white bg-primaryBtn"
          onClick={handleSubmit(onSubmit)}
        >
          Confirm
        </CustomButton>
      </ModalFooter>
    </>
  );
};
