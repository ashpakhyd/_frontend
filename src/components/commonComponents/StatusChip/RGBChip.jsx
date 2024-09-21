"use client"
import { Chip } from "@nextui-org/react";

const RgbChip = ({ status }) => {
  const getColor = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Deactivated":
      case "In Active":
        return "default";
      case "Deleted":
        return "danger";
      default:
        return "warning";
    }
  };

  return (
    <Chip color={getColor(status)} variant="bordered">
      {status}
    </Chip>
  );
};

export default RgbChip;
