import { Textarea } from "@nextui-org/react";
import React from "react";

const CustomTextArea = React.forwardRef(
  (
    {
      label,
      placeholder,
      labelPlacement,
      labelClassName,
      className,
      variant = "bordered",
      isRequired = true,
      ...rest
    },
    ref
  ) => {
    return (
      <Textarea
        label={label}
        labelPlacement={labelPlacement}
        placeholder={placeholder}
        className={className}
        variant={variant}
        isRequired={isRequired}
        classNames={{
          label: labelClassName, 
          inputWrapper: [
            "rounded-md border-2 border-gray-1 bg-transparent p-[1px]",
            "data-[hover=true]:bg-transparent",
            "group-data-[focus=true]:bg-transparent",
          ],
          innerWrapper: ["p-2 rounded-sm"],
          mainWrapper: " ",
          input: [" rounded-sm placeholder:text-gray-4 "],
        }}
        {...rest}
      />
    );
  }
);

CustomTextArea.displayName = "CustomTextArea";
export default CustomTextArea;
