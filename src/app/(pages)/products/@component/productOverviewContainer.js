import React from "react";
import Image from "next/image";
import CustomButton from "@/components/commonComponents/Button/Button";
import Container from "@/components/commonComponents/Container/Container";
import FilePicker from "@/components/commonComponents/FilePicker/FilePicker";
import { PopUpModal } from "@/components/commonComponents/Modal/Modal";
import CustomTextArea from "@/components/commonComponents/TextArea/TextArea";
import { Title } from "@/components/commonComponents/Titles/Titles";
import PlusIcon from "@/components/icons/PlusIcon";
import youtube from "@/assets/images/youtube.jpg";
import CustomInput from "@/components/commonComponents/TextInput/TextInput";
import { Controller, useForm } from "react-hook-form";
import { EditIconUnderlined } from "@/components/icons/EditIconUnderlined";
import { Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { isValid } from "@/utils/common-utils";

const ProductOverviewContainer = ({ setValue, getValues, watch }) => {
  const { productOverview } = watch();

  return (
    <Container>
      <Title className="">Overview</Title>
      {productOverview?.length > 0 &&
        productOverview.map(({ title, description, link, image }, index) => {
          const CustomLink = link ? Link : "div";
          return (
            <div key={index + ""} className="">
              <div className="flex justify-end">
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
                    <ProductOverViewModel
                      {...childrenProps}
                      getValues={getValues}
                      setValue={setValue}
                      mode="edit"
                      formData={{ title, description, link, image }}
                      editIndex={index}
                    />
                  )}
                </PopUpModal>
              </div>
              <div className="w-full flex justify-between items-center">
                <div className="flex flex-col w-[50%]">
                  <Title className="text-[#5A607F] text-sm font-semibold mb-4">
                    {title}
                  </Title>
                  <p className="w-[50%] text-[#5A607F] text-sm font-normal">
                    {description}
                  </p>

                  {link && (
                    <div className="">
                      <div className="text-sm font-semibold mt-2">
                        Video URL
                      </div>
                      <Link
                        className="text-sm underline text-blue-1"
                        href={link}
                        target="_blank"
                      >
                        {link}
                      </Link>{" "}
                    </div>
                  )}
                </div>
                <div className="flex w-[30%] items-center justify-center">
                  {image && (
                    <Image
                      src={image || youtube.src}
                      alt=""
                      height={100}
                      width={180}
                      className="h-[100px] rounded"
                      loading="lazy"
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      <PopUpModal
        title={(onOpen) => (
          <>
            <CustomButton
              className="border-none text-blue-1 mt-3"
              onClick={onOpen}
            >
              <PlusIcon fill="#1E5EFF" /> Add Overview
            </CustomButton>
          </>
        )}
      >
        {(childrenProps) => (
          <ProductOverViewModel
            {...childrenProps}
            getValues={getValues}
            setValue={setValue}
          />
        )}
      </PopUpModal>
    </Container>
  );
};

export default ProductOverviewContainer;

const ProductOverViewModel = ({
  onClose,
  ModalHeader,
  ModalBody,
  ModalFooter,
  setValue,
  getValues,
  mode = "add",
  formData = null,
  editIndex = null,
}) => {
  const {
    title = "",
    description = "",
    link: videoUrl = "",
    image: imageUrl,
  } = formData || {};
  const {
    control,
    handleSubmit,
    watch,
    setValue: setInnerFormVAlue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title,
      link: videoUrl,
      description,
      image: imageUrl,
    },
  });
  const { link, image } = watch();
  const onSubmit = (data) => {
    if (mode === "add") {
      const value = getValues("productOverview");
      console.log(value);
      setValue("productOverview", [...value, data]);
    } else {
      const value = getValues("productOverview");
      value[editIndex] = data;
      setValue("productOverview", value);
    }
    onClose();
  };
  return (
    <form>
      <ModalHeader>
        <p className="flex flex-col gap-0 font-bold text-md">
          {mode === "add" ? "Add" : "Update"} Overview
        </p>
      </ModalHeader>
      <ModalBody>
        <Controller
          name="title"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <CustomInput
              type="text"
              placeholder="E.g. Store your food in ideal conditions with VitaFreshPro(TM)"
              label="Title"
              labelPlacement="outside"
              isInvalid={isValid("title", errors)}
              errorMessage="Please enter title"
              {...field}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <CustomTextArea
              placeholder="E.g. (P)Store oversized platters with ease until you re ready to serve them.(/P)"
              label="Description"
              labelPlacement="outside"
              isInvalid={isValid("description", errors)}
              errorMessage="Please enter description"
              {...field}
            />
          )}
        />
        <div className="mt-[-15px]">
          <Controller
            name="link"
            control={control}
            rules={{ required: !image }}
            render={({ field }) => (
              <CustomInput
                className="mt-0"
                type="text"
                placeholder="www.example.com/video"
                label="Video Url"
                labelPlacement="outside"
                isInvalid={isValid("link", errors)}
                disabled={image}
                {...field}
              />
            )}
          />
        </div>
        <div className="mt-3">
          <Controller
            name="image"
            control={control}
            rules={{ required: !link }}
            render={({ field }) => (
              <FilePicker
                className="max-h-[100px]"
                label="Upload Image"
                hideFiles={true}
                disabled={!!link}
                folderName="Product OverView"
                imageUrl={image || ""}
                isInvalid={isValid("image", errors)}
                onSuccess={(imageurl) => {
                  setInnerFormVAlue("image", imageurl);
                }}
                onClose={() => {
                  setInnerFormVAlue("image", null);
                }}
                {...field}
              />
            )}
          />
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
    </form>
  );
};
