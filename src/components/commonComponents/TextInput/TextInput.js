import React from "react";
import { Input } from "@nextui-org/react";

const CustomInput = React.forwardRef(({
  type,
  label,
  placeholder,
  labelPlacement,
  className,
  radius = "none",
  startContentJSX,
  endContentJSX,
  variant = "bordered",
  isCurrency = false,
  isRequired = true,
  ...rest
}, ref) => {
  return (
    <Input
      defaultValue=""
      type={type}
      label={label}
      placeholder={placeholder}
      labelPlacement={labelPlacement}
      radius={radius}
      variant={variant}
      isRequired={isRequired}
      ref={ref}
      autoComplete="off"
      classNames={{
        inputWrapper: [
          "rounded-md bg-white",
          "data-[hover=true]:bg-white",
          "group-data-[focus=true]:bg-white",
        ],
        label: ["group-data-[filled-within=true]:text-gray-2"],
        input: ["placeholder:text-gray-4 "],
        mainWrapper: "mt-4",
        helperWrapper: ["border-none"],
        // errorMessage: "text-black"
      }}
      className={className}
      startContent={
        isCurrency ? (
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">$</span>
          </div>
        ) : (
          startContentJSX
        )
      }
      endContent={
        isCurrency ? (
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">USD</span>
          </div>
        ) : (
          endContentJSX
        )
      }
      {...rest}
    />
  );
});

CustomInput.displayName = 'CustomInput';

export default CustomInput;
