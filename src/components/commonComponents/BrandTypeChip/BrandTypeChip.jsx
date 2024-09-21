import { capitalize } from "@/utils/common-utils";
import { brandsTypeArr } from "@/utils/constant";
import { Chip } from "@nextui-org/react";

export const BrandTypeChip = ({ type }) => {
  const getChipBgColor = (type) => {
    if (type === "premium") return "bg-premium1";
    else if (type === "partsAndAccessories") return "bg-parts1";
    return "bg-basic1";
  };
  const getChipColor = (type) => {
    if (type === "premium") return "text-premiumText1";
    return "text-basicText1";
  };

  const className = ` min-w-16 text-center ${getChipColor(
    type
  )} ${getChipBgColor(type)} `;

  const label = brandsTypeArr.find(arr => arr.value === type)?.label || "Default Label";

  return (
    <div>
      <Chip
        size="sm"
        className={className}
      >
        {label}
      </Chip>
    </div>
  );
};
