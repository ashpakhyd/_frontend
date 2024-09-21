import { Chip } from "@nextui-org/react";

export const StatusChip = ({ status }) => {
  return (
    <div>
      {" "}
      <Chip
        size="sm"
        variant="bordered"
        color={status ? "success" : "default"}
        className="min-w-16 text-center"
      >
        {status ? "Active" : "InActive"}
      </Chip>
    </div>
  );
};
