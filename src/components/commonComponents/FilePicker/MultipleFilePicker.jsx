"use client";
import { Button } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import { useUploadMediaMutation } from "@/redux/apiSlices/utilsApi";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import DeleteIcon from "@/components/icons/DeleteIcon";

const MultipleFilePicker = React.forwardRef(
  (
    {
      label = "Add File",
      onChange = () => {},
      onClose = () => {},
      imageUrl = [],
      folderName = "",
      isInvalid,
      selectedIndex = 0,
      errorMessage,
      disabled = false,
      accept = "image/*",
      previewWidth = 100,
      previewHeight = 50,
      multiple = true,
      setValue,
      watch,
    },
    ref
  ) => {
    const [uploadMedia, { data, isSuccess, isLoading, isError, error }] =
      useUploadMediaMutation();
    const fileInputRef = useRef(null);
    console.log("first")
    useEffect(() => {
      if (isSuccess) {
        const { presignedUrl } = data?.data || {};
        const multiImages = [...imageUrl, ...presignedUrl]
        onChange(multiImages);
      }
    }, [isSuccess, data]);

    useEffect(() => {
      if (isError) {
        const errMsg = error?.data?.error;
        toast.error(errMsg);
      }
    }, [isError, error]);

    const handleFileChange = (event) => {
      const files = event.target.files;
      uploadSelection(files);
    };

    const uploadSelection = (files) => {
      const formData = new FormData();
      formData.append("type", folderName);
      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });

      if (files.length) {
        uploadMedia(formData);
      }
    };

    const handleButtonClick = () => {
      if (!disabled) fileInputRef.current.click();
    };

    const handleDragStart = (index) => {
      fileInputRef.current.draggedIndex = index;
    };

    const handleDrop = (index) => {
      const draggedIndex = fileInputRef.current.draggedIndex;
      if (draggedIndex === index) return;

      const updatedImages = [...imageUrl];
      const temp = updatedImages[draggedIndex];
      updatedImages[draggedIndex] = updatedImages[index];
      updatedImages[index] = temp;
      onChange(updatedImages);
    };

    const handleDelete = (index) => {
      const updatedImages = imageUrl.filter((_, imgIndex) => imgIndex !== index);
      onChange(updatedImages)
    };
    const handleRadioChange = (index) => {
      if (index !== selectedIndex) {
        const updatedImages = [...imageUrl];
        const [selectedImage] = updatedImages.splice(index, 1); 
        updatedImages.unshift(selectedImage); 
        onChange(updatedImages, 0); 
      }
    };

    return (
      <div ref={ref}>
        <div
          className={`border-dashed border-2 rounded-lg h-40 flex flex-col items-center justify-center ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? (
            <Loader />
          ) : imageUrl.length > 0 ? (
            <div className="flex gap-4 overflow-x-auto items-center mx-2">
              {imageUrl.map((img, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDrop={() => handleDrop(index)}
                  onDragOver={(e) => e.preventDefault()}
                  className="relative flex-shrink-0 ml-2 pb-4"
                >
                   <div className="absolute top-0 left-0">
                    <input
                      type="radio"
                      checked={index === selectedIndex}
                      onChange={() => handleRadioChange(index)}
                    />
                  </div>
                  <div
                    role="button"
                    className="absolute top-0 right-0 cursor-pointer"
                    onClick={() => handleDelete(index)}
                  >
                    <DeleteIcon fill="red" />
                  </div>
                  <img
                    src={img}
                    width={previewWidth}
                    height={previewHeight}
                    alt={`image-${index}`}
                    className="h-[100px] w-auto rounded-lg"
                  />
                </div>
              ))}
              <div className="flex items-center justify-center border-2 border-dashed border-2 border-gray-1 rounded-lg w-20 bg-gray h-20 cursor-pointer flex-shrink-0 mr-2 mb-3">
                {" "}
                <Button
                  className="text-gray-1 bg-white border-none rounded-lg px-6 text-2xl"
                  onClick={handleButtonClick}
                  disabled={disabled}
                >
                  +
                </Button>
              </div>
            </div>
          ) : (
            <Button
              className="text-blue-1 bg-white border-2 border-gray-1 rounded-lg px-6"
              onClick={handleButtonClick}
              disabled={disabled}
            >
              {label}
            </Button>
          )}
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            accept={accept}
            multiple={multiple}
            onChange={handleFileChange}
            disabled={disabled}
          />
        </div>
        {isInvalid && <p className="text-xs p-1 text-error">{errorMessage}</p>}
      </div>
    );
  }
);

MultipleFilePicker.displayName = "MultipleFilePicker";

export default MultipleFilePicker;
