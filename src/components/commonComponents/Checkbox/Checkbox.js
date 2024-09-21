import React from "react";
import { Checkbox } from "@nextui-org/react";

const CustomCheckbox = ({ label, defaultSelected, ...props }) => {
  return (
    <Checkbox
      radius="sm"
      className=" p-0 text-sm pl-2"
      // classNames={}
      defaultSelected={defaultSelected}
      {...props}
    >
      {label}
    </Checkbox>
  );
};

export default CustomCheckbox;
