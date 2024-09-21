import React from 'react';
import { Switch } from "@nextui-org/react";
import { cn } from "@/utils/common-utils";
import { Title } from "../Titles/Titles";

const Toggle = React.forwardRef(({
  text,
  onChangeHandler,
  className,
  label = "",
  startText = "",
  ...rest
}, ref) => {
  return (
    <div className="w-full flex justify-between items-center">
      {label && (
        <Title className="text-sm font-normal text-gray-2 mb-0">{label}</Title>
      )}

      <div className="flex gap-2">
        <Title className="text-sm font-normal text-gray-9 mb-0">
          {startText}
        </Title>
        <Switch
          color="default"
          ref={ref}
          classNames={{
            base: cn(),
            wrapper: "p-0 h-4 overflow-visible",
            thumb: cn(
              "w-6 h-6 border-2 shadow-lg border-gray-3",
              "group-data-[hover=true]:border-grey-3",
              // selected
              "group-data-[selected=true]:ml-6",
              // pressed
              "group-data-[pressed=true]:w-7",
              "group-data-[selected]:group-data-[pressed]:ml-4"
            ),
          }}
          {...rest}
        ></Switch>
      </div>
    </div>
  );
});

Toggle.displayName = 'Toggle';

export default Toggle;
