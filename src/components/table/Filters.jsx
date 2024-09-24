import { useQueryParams } from "@/utils/useQueryParams";
import { useState } from "react";
import CustomButton from "../commonComponents/Button/Button";
import SearchBar from "../commonComponents/SearchBar/SearchBar";

const Filters = () => {
  const { setQueryParams } = useQueryParams();
  const filterButtons = [
    { name: "All", value: "all" },
    { name: "Active", value: "isActive" },
    { name: "InActive", value: "inActive" },
  ];

  const [selectedFilterButton, setSelectedFilterButton] = useState({
    name: "All",
    value: "all",
  });

  const handleFilterButton = (selectedBtn) => {
    setSelectedFilterButton(selectedBtn);
    if (selectedBtn.value === "isActive") {
      setQueryParams({ filterBy: "isActive", filterValue: true, page: 1 });
    } else if (selectedBtn.value === "inActive") {
      setQueryParams({ filterBy: "isActive", filterValue: false, page: 1 });
    } else {
      setQueryParams({ filterBy: "", filterValue: "", page: 1 });
    }
  };

  return (
    <div className="flex flex-wrap justify-between items-center gap-2">
      <div className="flex space-x-2">
        <SearchBar />
        {filterButtons?.map((btn) => {
          return (
            <CustomButton
              key={btn.value}
              onClick={() => handleFilterButton(btn)}
              className={`border-2 ${
                selectedFilterButton?.name === btn.name
                  ? " border-gray-9 bg-gray-9 "
                  : "border-gray-9"
              } `}
              variant="light"
            >
              {btn.name}
            </CustomButton>
          );
        })}
      </div>
    </div>
  );
};

export default Filters;
