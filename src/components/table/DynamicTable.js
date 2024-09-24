import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip } from "@nextui-org/react";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const statusColorMap = {
  shipped: "success",
  "in production": "warning",
  cancelled: "danger",
  draft: "default",
};

const DynamicTable = ({ columns, data }) => {
  const renderCell = (item, columnKey) => {
    // Transformation happens inside the switch based on the raw data
    switch (columnKey) {
      case "orderId":
        return item._id; // Display the order ID

      case "client":
        return (
          <User
            avatarProps={{ radius: "lg", src: "" }} // Placeholder for avatar
            description={"N/A"} // Placeholder for email
            name={item.customerName} // Use customerName from raw data
          />
        );

      case "product":
        return item.product ? item.product.name : "N/A"; // Display product name or fallback

      case "quantity":
        return item.quantity; // Display quantity from the raw data

      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap["draft"]} size="sm" variant="flat">
            N/A {/* Placeholder, adjust based on real status */}
          </Chip>
        );

      case "actions":
        return (
          <div className="flex items-center gap-2">
            <Tooltip content="View Details">
              <span className="cursor-pointer">
                <AiOutlineEye size={20} />
              </span>
            </Tooltip>
            <Tooltip content="Edit Order">
              <span className="cursor-pointer">
                <AiOutlineEdit size={20} />
              </span>
            </Tooltip>
            <Tooltip content="Delete Order" color="danger">
              <span className="cursor-pointer">
                <AiOutlineDelete size={20} />
              </span>
            </Tooltip>
          </div>
        );

      default:
        return item[columnKey]; // For other columns, return the raw data
    }
  };

  return (
    <Table aria-label="Dynamic Table with Actions">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={data}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DynamicTable;
