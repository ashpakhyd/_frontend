"use client";
import React from "react";
import DynamicTable from "@/components/table/DynamicTable";
import { useGetOrderQuery } from "@/redux/apiSlices/orderApi";

const columns = [
  { name: "ORDER ID", uid: "orderId" },
  { name: "CLIENT", uid: "client" },
  { name: "PRODUCT NAME", uid: "product" },
  { name: "QUANTITY", uid: "quantity" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" }
];

export default function OrderPage() {
  const { data, isLoading } = useGetOrderQuery();

  const orders = data?.orders || [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Order Management</h1>
      <DynamicTable columns={columns} data={orders} />
    </div>
  );
}
