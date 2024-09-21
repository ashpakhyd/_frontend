"use client";
import { useEffect, useState } from "react";
import TableContainer from "@/components/table/tablecontainer";
import {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/apiSlices/orderApi";
import { capitalize, formatDateTimeUS } from "@/utils/common-utils";
import { Select, SelectItem } from "@nextui-org/react";
import ConfirmationModal from "@/components/commonComponents/ConfirmationModal/ConfirmationModal";
import { toast } from "react-toastify";
import { useQueryParams } from "@/utils/useQueryParams";
import Link from "next/link";

const INITIAL_VISIBLE_COLUMNS = [
  { name: "ORDER", uid: "order" },
  { name: "DATE", uid: "orderDate" },
  { name: "CUSTOMER", uid: "customer" },
  { name: "ORDER STATUS", uid: "orderStatus" },
  { name: "TOTAL", uid: "totalAmount" },
];
const orderStatusOptions = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "canceled", label: "Canceled" },
  { value: "returned", label: "Returned" },
  { value: "confirmed", label: "Confirmed" },
];

const Orders = () => {
  const { limit, page, search } = useQueryParams();
  const {
    data,
    isSuccess: isFetchSuccess,
    isFetching: isOrderLoading,
  } = useGetOrdersQuery({
    limit,
    page,
    search,
  });
  const [updateStatus, { isSuccess, data: updateResponse }] =
    useUpdateOrderStatusMutation();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusToUpdate, setStatusToUpdate] = useState("");

  useEffect(() => {
    if (isSuccess) {
      if (updateResponse.success) {
        toast.success(updateResponse?.msg || "Status updated successfully!");
      } else {
        toast.error(
          updateResponse?.msg || "An error occurred while updating the status."
        );
      }
    }
  }, [isSuccess, updateResponse]);

  const handleStatusChange = (orderId, status) => {
    setSelectedOrder(orderId);
    setStatusToUpdate(status?.anchorKey);
  };

  const confirmToggleChange = () => {
    updateStatus({
      orderId: selectedOrder,
      status: statusToUpdate,
    })
      .then(() => {
        setSelectedOrder(null);
      })
      .catch((error) => {
        console.error("Failed to update status:", error);
      });
  };

  return (
    <>
      <ConfirmationModal
        message={`Are you sure you want to update the status to "${statusToUpdate}"?`}
        onConfirm={confirmToggleChange}
        onCancel={() => setSelectedOrder(null)}
        isModalOpen={!!selectedOrder}
      />
      <TableContainer
        pageHeading="Orders"
        headerColumns={INITIAL_VISIBLE_COLUMNS}
        isLoading={isOrderLoading}
        isSuccess={isFetchSuccess}
        tableLabel="Orders"
        paginationData={data?.pagination}
        data={isFetchSuccess ? data.data : []}
        customRender={(user, columnKey, cellValue) => {
          switch (columnKey) {
            case "orderStatus":
              return (
                <Select
                  placeholder="Select status"
                  selectedKeys={new Set([user.status])}
                  onSelectionChange={(value) =>
                    handleStatusChange(user.id, value)
                  }
                  aria-label="Order Status"
                  style={{ width: "12vw" }}
                >
                  {orderStatusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </Select>
              );
              case "order": 
              return (
                <Link 
                  href={{
                    pathname: `orders/${user?.id}`, 
                    query: { orderId: user?.id } 
                  }}
                >
                  #{user?.id}
                </Link>
              );
            case "customer":
              return (
                <p>
                  {user?.user?.firstName
                    ? capitalize(user?.user?.firstName)
                    : "Not Found"}
                </p>
              );
            case "totalAmount":
              return <p>{`$${user?.totalAmount}`}</p>;
            case "orderDate":
              return <p>{formatDateTimeUS(user.orderDate)}</p>;
            default:
              return cellValue;
          }
        }}
      />
    </>
  );
};

export default Orders;
