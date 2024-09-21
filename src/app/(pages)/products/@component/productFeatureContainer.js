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
import CustomInput from "@/components/commonComponents/TextInput/TextInput";

const ProductFeatureContainer = ({ setValue, getValues, watch }) => {
  const { productFeature } = watch();
  return (
    <Container>
      <div className="flex justify-between items-center">
        <Title>Features</Title>

        {productFeature?.length > 0 && (
          <PopUpModal
            title={(onOpen) => (
              <Tooltip showArrow={true} content="Edit">
                <span onClick={onOpen} className="cursor-pointer">
                  <EditIconUnderlined fill="#5A607F" />
                </span>
              </Tooltip>
            )}
          >
            {(childrenProps) => (
              <AddFeaturesModel
                {...childrenProps}
                getValues={getValues}
                setValue={setValue}
                mode="edit"
                formData={productFeature}
              />
            )}
          </PopUpModal>
        )}
      </div>
      <div className="space-y-4 text-gray-2">
        {productFeature?.length > 0 &&
          productFeature.map(({ key, value }, index) => (
            <div key={index}>
              <div className="text-sm font-semibold">{key}</div>
              <div className="text-sm mt-2">{value}</div>
            </div>
          ))}
      </div>

      <PopUpModal
        title={(onOpen) => (
          <CustomButton
            className="border-none text-blue-1 mt-3"
            onClick={onOpen}
          >
            <PlusIcon fill="#1E5EFF" /> Add Features
          </CustomButton>
        )}
      >
        {(childrenProps) => {
          return (
            <AddFeaturesModel
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

export default ProductFeatureContainer;

const AddFeaturesModel = ({
  onClose,
  ModalHeader,
  ModalBody,
  ModalFooter,
  setValue,
  getValues,
  mode = "add",
  formData = [
    {
      key: "",
      value: "",
    },
  ],
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productFeature: [...formData],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "productFeature",
  });

  const onSubmit = (data) => {
    const { productFeature } = data;
    const value = getValues("productFeature");
    if (mode === "add") {
      setValue("productFeature", [...value, ...productFeature]);
    } else {
      setValue("productFeature", [...productFeature]);
    }
    onClose();
  };

  return (
    <>
      <ModalHeader>
        <p className="flex flex-col gap-1 font-bold text-md">
          {mode === "add" ? "Add" : "Update"} Features
        </p>
      </ModalHeader>
      <ModalBody>
        {fields.map((item, index) => (
          <div key={index} className="flex flex-col gap-3 my-0">
            <Controller
              name={`productFeature[${index}].key`}
              control={control}
              defaultValue={item.name}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomInput
                  type="text"
                  placeholder="E.g. color"
                  label="Title"
                  labelPlacement="outside"
                  isInvalid={
                    !!(errors?.productFeature && errors?.productFeature[index]?.key)
                  }
                  errorMessage="Please enter title"
                  {...field}
                />
              )}
            />
            <Controller
              name={`productFeature[${index}].value`}
              defaultValue={item.value}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextArea
                  type="text"
                  placeholder="E.g. Red"
                  label="Value"
                  labelPlacement="outside"
                  isInvalid={
                    !!(errors?.productFeature &&
                    errors?.productFeature[index]?.value)
                  }
                  errorMessage="Please enter value"
                  {...field}
                />
              )}
            />

            {fields.length > 1 && (
              <div className="flex  justify-end" onClick={() => remove(index)}>
                <CrossIcon />
              </div>
            )}
          </div>
        ))}

        <div className="w-full flex pt-5 justify-start items-center mt-0">
          <CustomButton
            startContent={<PlusIcon fill="#1E5EFF" />}
            className="border-none text-blue-1"
            onClick={() =>
              append({
                key: "",
                value: "",
              })
            }
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
