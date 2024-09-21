import React from "react";
import CustomButton from "@/components/commonComponents/Button/Button";
import Container from "@/components/commonComponents/Container/Container";
import { PopUpModal } from "@/components/commonComponents/Modal/Modal";
import CustomSelect from "@/components/commonComponents/Select/Select";
import CustomInput from "@/components/commonComponents/TextInput/TextInput";
import { Title } from "@/components/commonComponents/Titles/Titles";
import PlusIcon from "@/components/icons/PlusIcon";
import CrossIcon from "@/components/icons/CrossArrowIcon";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Tooltip } from "@nextui-org/react";
import { EditIconUnderlined } from "@/components/icons/EditIconUnderlined";
import { isValid } from "@/utils/common-utils";
import { unitsArr } from "@/utils/constant";
import { useGetSpecificationQuery } from "@/redux/apiSlices/utilsApi";
import { useEffect, useState } from "react";
import CustomAutoComplete from "@/components/commonComponents/Autocomplete/Autocomplete";
import GlobalDropdown from "@/components/commonComponents/GlobalDropdown/GlobalDropdown";

const ProductSpecificationContainer = ({
  setValue,
  getValues,
  watch,
  mode,
}) => {
  const { productSpecification } = watch();
  return (
    <Container>
      <Title>Specifications</Title>

      {productSpecification?.length > 0 &&
        productSpecification.map(({ category, details }, index) => (
          <div key={index} className="border-b-1 border-gray-4 pb-3 mt-4">
            <div className="flex justify-between">
              <Title className="text-[#5A607F] text-sm font-semibold mb-4">
                {category}
              </Title>

              <PopUpModal
                size="2xl"
                title={(onOpen) => (
                  <Tooltip showArrow={true} content="Edit">
                    <span onClick={onOpen} className="cursor-pointer">
                      <EditIconUnderlined fill="#5A607F" />
                    </span>
                  </Tooltip>
                )}
              >
                {(childrenProps) => (
                  <AddSpecificationModel
                    {...childrenProps}
                    getValues={getValues}
                    setValue={setValue}
                    mode="edit"
                    formData={{ category, details }}
                    editIndex={index}
                  />
                )}
              </PopUpModal>
            </div>
            {details?.map(({ key, value, unit, sequence }, index) => (
              <div key={index} className="w-full flex justify-between mt-2">
                <p className="w-[50%] text-[#5A607F] text-sm font-normal">
                  {sequence}
                </p>
                <p className="w-[50%] text-[#5A607F] text-sm font-normal mt-1">
                  {key}
                </p>
                <p className="w-[50%] text-[#5A607F] text-sm font-normal">
                  {value}
                </p>
                <p className="w-[50%] text-[#5A607F] text-sm font-normal mt-1">
                  {unit}
                </p>
              </div>
            ))}
          </div>
        ))}
      {mode === "save" && (
        <PopUpModal
          size="2xl"
          title={(onOpen) => (
            <CustomButton
              className="border-none text-blue-1 mt-3"
              onClick={onOpen}
            >
              <PlusIcon fill="#1E5EFF" /> Add Specifications
            </CustomButton>
          )}
        >
          {(childrenProps) => {
            return (
              <AddSpecificationModel
                {...childrenProps}
                getValues={getValues}
                setValue={setValue}
              />
            );
          }}
        </PopUpModal>
      )}
    </Container>
  );
};

export default ProductSpecificationContainer;

const sequenceOptions = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
  { label: "6", value: 6 },
];
const AddSpecificationModel = ({
  onClose,
  ModalHeader,
  ModalBody,
  ModalFooter,
  setValue,
  getValues,
  mode = "add",
  formData = {
    category: "",
    details: [
      {
        key: "",
        value: "",
        unit: "",
        sequence: "",
      },
    ],
  },
  editIndex = null,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      productSpecification: formData,
    },
  });

  const { data, isSuccess } = useGetSpecificationQuery();
  const { productSpecification } = watch();
  const selectedCategory = watch("productSpecification.category");

  const headingOptions = (data?.data || []).map((item) => ({
    label: item?.categoryName,
    value: item?.categoryName,
  }));

  const { fields, append, remove } = useFieldArray({
    control,
    name: "productSpecification.details",
  });

  const onSubmit = (data) => {
    const value = getValues("productSpecification");
    const { productSpecification } = data;
    if (mode === "add") {
      setValue("productSpecification", [...value, { ...productSpecification }]);
    } else {
      value[editIndex] = productSpecification;
      setValue("productSpecification", value);
    }
    onClose();
  };

  return (
    <>
      <ModalHeader>
        <p className="flex flex-col gap-1 font-bold text-md">
          {mode === "add" ? "Add" : "Update"} Specifications
        </p>
      </ModalHeader>
      <ModalBody>
        <Controller
          name="productSpecification.category"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <GlobalDropdown
              field={field}
              options={headingOptions}
              isMulti={false}
              placeholder="E.g. CAPACITY"
              label="Heading"
              name="productSpecification.category"
              errors={errors}
              labelStyle={"dropLabel"}
              errorMessage="Please select heading"
              required={false}
            />
          )}
        />

        {fields.map((item, index) => {
          const selectedSequences = productSpecification?.details
            ?.map((detail) => detail.sequence)
            ?.filter(Boolean);

          const filteredSequenceOptions = sequenceOptions.filter(
            (option) =>
              !selectedSequences.includes(option.value) ||
              option.value === productSpecification.details[index].sequence
          );
          console.log("errors", errors);
          return (
            <div key={index} className="flex gap-3 items-end">
              <div className="flex-1 pb-2">
                <Controller
                  name={`productSpecification.details[${index}].sequence`}
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <GlobalDropdown
                      field={field}
                      options={filteredSequenceOptions}
                      isMulti={false}
                      placeholder="E.g. 1"
                      label="Sequence"
                      name={`productSpecification.details[${index}].sequence`}
                      errors={!!errors}
                      labelStyle={"dropLabel"}
                      errorMessage="Please select sequence"
                      required={false}
                      isClearable={true}
                    />
                  )}
                />
              </div>
              <div className="flex-1 pb-2">
                <Controller
                  name={`productSpecification.details[${index}].key`}
                  control={control}
                  defaultValue={item.name}
                  rules={{ required: true }}
                  render={({ field }) => {
                    const categoryData = (data?.data || []).find(
                      (category) => category?.categoryName === selectedCategory
                    );
                    const keyOptions =
                      categoryData?.specificationMaster?.map((spec) => ({
                        label: spec?.specificationName,
                        value: spec?.specificationName,
                      })) || [];
                    return (
                      <GlobalDropdown
                        field={field}
                        options={keyOptions}
                        isMulti={false}
                        placeholder="E.g. Color"
                        label="Title"
                        name={`productSpecification.details[${index}].key`}
                        errors={
                          errors?.productSpecification?.details?.[index]?.key
                        }
                        labelStyle={"dropLabel"}
                        errorMessage="Please Select value"
                        required={true}
                      />
                    );
                  }}
                />
              </div>
              <div className="flex-1">
                <Controller
                  name={`productSpecification.details[${index}].value`}
                  defaultValue={item.value}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomInput
                      type="text"
                      placeholder="E.g. Reversible Door"
                      label="Value"
                      labelPlacement="outside"
                      isInvalid={
                        !!errors?.productSpecification?.details?.[index]?.value
                      }
                      errorMessage="Please enter value"
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="flex-1">
                <Controller
                  name={`productSpecification.details[${index}].unit`}
                  defaultValue={item.value}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomSelect
                      label="Unit"
                      placeholder="E.g. Unit"
                      items={unitsArr}
                      isRequired={true}
                      {...field}
                      isInvalid={
                        errors?.productSpecification?.details?.[index]?.unit
                          ? true
                          : false
                      }
                      errorMessage="Please enter value"
                      selectedKeys={[field.value]}
                      className="p-[4px]"
                    />
                  )}
                />
              </div>

              {fields.length > 1 && (
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

        <div className="w-full flex pt-5 justify-start items-center mt-0">
          <CustomButton
            startContent={<PlusIcon fill="#1E5EFF" />}
            className="border-none text-blue-1"
            onClick={() =>
              append({
                sequence: "",
                key: "",
                value: "",
                unit: "",
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
