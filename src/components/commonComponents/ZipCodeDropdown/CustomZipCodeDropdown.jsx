import React, { useState, useMemo } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import SearchBarIcon from "@/components/icons/SearchBarIcon";

const CustomZipCodeDropdown = ({
  data = [],
  label = "",
  placeholder = "",
  isLoading = false,
  onInputChange = () => {},
  scrollProps = {},
  isRequired = true,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [, scrollerRef] = useInfiniteScroll({
    isEnabled: isOpen,
    scrollContainer: "auto",
    ...scrollProps,
  });

  const handleSearchInputChange = (term) => {
    onInputChange(term);
  };

  const uniqueItems = useMemo(
    () =>
      data.filter(
        (obj, index) => index === data.findIndex((o) => obj.value === o.value)
      ),
    [data]
  );

  return (
    <Autocomplete
      {...rest}
      isRequired={isRequired}
      isClearable={false}
      items={uniqueItems}
      label={label}
      placeholder={placeholder}
      variant="bordered"
      labelPlacement="outside"
      startContent={<SearchBarIcon />}
      isLoading={isLoading}
      onInputChange={(value) => handleSearchInputChange(value)}
      scrollRef={scrollerRef}
      onOpenChange={setIsOpen}
      classNames={{
        base: [
          "rounded-md bg-white",
          "data-[hover=true]:bg-white",
          "group-data-[focus=true]:bg-white border-grey-1",
        ],
        popover: ["z-[3]"],
        mainWrapper: ["rounded-md bg-white border-gray-5 "],
        value: ["text-gray-4"],
        label: [
          "group-data-[filled-within=true]:text-gray-2",
          "group-data-[has-value=true]:text-red",
        ],
      }}
    >
      {(item) => (
        <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default CustomZipCodeDropdown;
