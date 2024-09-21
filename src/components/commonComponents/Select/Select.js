import { Select, SelectItem } from "@nextui-org/react";
import React from "react";

const CustomSelect = React.forwardRef(
  (
    {
      className = "",
      label = "Size",
      placeholder = "Size",
      items = [],
      isInvalid,
      isRequireds,
      ...rest
    },
    ref
  ) => {
    return (
      <Select
        labelPlacement="outside"
        label={label}
        placeholder={placeholder}
        className={className}
        isInvalid={isInvalid}
        isRequired={isRequireds}
        ref={ref}
        {...rest}
        classNames={{
          trigger: [
            `rounded-md bg-white border-2 mb-1 ${
              isInvalid ? "border-error" : "border-gray-5"
            }`,
            "data-[hover=true]:bg-white",
            "group-data-[focus=true]:bg-white",
          ],
          mainWrapper: ["rounded-md bg-white"],
          helperWrapper: ["p-0"],
          value: ["text-gray-4"],
          label: [
            "group-data-[filled-within=true]:text-gray-2",
            "group-data-[has-value=true]:text-red",
          ],
        }}
      >
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </Select>
    );
  }
);

CustomSelect.displayName = "CustomSelect";

export default CustomSelect;
