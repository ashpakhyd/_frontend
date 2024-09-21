"use client";
import CloseIcon from "@/icons/CloseIcon";
import { useUploadMediaMutation } from "@/redux/apiSlices/utilsApi";
import { cn } from "@/utils/common-utils";
import { Button } from "@nextui-org/react";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";

const FilePicker = React.forwardRef(
  (
    {
      className = "",
      label = "Add File",
      hideFiles = false,
      hideDragLine = false,
      onSuccess = () => {},
      onClose = () => {},
      imageUrl = [], // Expecting imageUrl as an array now
      folderName = "",
      isInvalid,
      errorMessage,
      disabled = false,
      accept = "image/*",
      previewWidth = 100,
      previewHeight = 50,
      multiple = false,
    },
    ref
  ) => {
    const [uploadMedia, { data, isSuccess, isLoading, isError, error }] =
      useUploadMediaMutation();
    const fileInputRef = useRef(null);

    useEffect(() => {
      if (isSuccess) {
        const { originalUrl, presignedUrl } = data?.data || {};
        onSuccess(presignedUrl[0], originalUrl[0]);
      }
    }, [isSuccess]);

    useEffect(() => {
      if (isError) {
        const errMsg = error?.data?.error;
        toast.error(errMsg);
      }
    }, [isError]);

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
      if (disabled) return;
      fileInputRef.current.click();
    };

    const handleFileDrop = (event) => {
      if (disabled) return;
      event.preventDefault();
      const files = event.dataTransfer.files;
      uploadSelection(files);
    };

    const handleDragOver = (event) => {
      if (disabled) return;
      event.preventDefault();
    };

    return (
      <div ref={ref}>
        <div
          role="none"
          className={cn(
            `text-base py-2 px-4 border-3 ${
              isInvalid ? " border-error" : " border-gray-1"
            }  border-dashed rounded-lg h-40 flex flex-col items-center justify-center `,
            disabled && "opacity-50 cursor-not-allowed ",
            className
          )}
          onDrop={handleFileDrop}
          onDragOver={handleDragOver}
        >
          {isLoading ? (
            <Loader />
          ) : imageUrl ? (
            <div className="flex ">
              <img
                src={imageUrl}
                width={previewWidth}
                height={previewHeight}
                alt="image"
                className="w-[100%] max-h-20"
              />
              <span role="button" className="cursor-pointer" onClick={onClose}>
                <CloseIcon />
              </span>
            </div>
          ) : (
            <>
              <Button
                className={`text-blue-1 bg-white border-2 border-gray-1 rounded-lg px-6 ${
                  disabled ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                onClick={handleButtonClick}
              >
                {label}
                <div className="hidden">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    accept={accept}
                    disabled={disabled}
                    multiple={multiple} // Allow multiple files
                  />
                </div>
              </Button>
              {!hideDragLine && (
                <p className="mt-3 text-sm text-gray-2">
                  Or drag and drop files
                </p>
              )}
            </>
          )}
        </div>
        {isInvalid && <p className="text-xs p-1 text-error">{errorMessage}</p>}
        {!hideFiles && (
          <p className="mt-3 text-sm text-gray-2">
            {/* Display additional info about selected files here if needed */}
          </p>
        )}
      </div>
    );
  }
);

FilePicker.displayName = "FilePicker";

export default FilePicker;
