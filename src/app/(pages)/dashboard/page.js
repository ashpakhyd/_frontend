"use client";

import { FaBoxOpen, FaEye, FaFileInvoice } from "react-icons/fa";
import DispatchOverview from "./@components/DispatchOverview";
import InventoryOverview from "./@components/InventoryOverview";
import OrdersOverview from "./@components/OrdersOverview";
import ProductionOverview from "./@components/ProductionOverview";
import FeaturedCard from "./@components/FeaturedCard";
import { useGetInvoicesQuery } from "@/redux/apiSlices/invoiceApi";
import { useQueryParams } from "@/utils/useQueryParams";
import Link from "next/link";

export default function Dashboard() {
  const { limit, page, search } = useQueryParams();

  const { data, isFetching, isSuccess } = useGetInvoicesQuery({
    limit,
    page,
    search,
  });
  // const {totalInvoices } = data
  console.log("data", data);
  return (
    <div className="flex">
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          <OrdersOverview />
          <Link href={`/generate-invoice/create`}>
            <FeaturedCard
              title="New Bill Generate"
              value={data?.totalInvoices}
              icon={<FaFileInvoice size={24} />}
              percentage={15}
              description="Monthly increase"
              isPositive={true}
            />
          </Link>

          <FeaturedCard
            title="Total Orders"
            value={120}
            icon={<FaBoxOpen size={24} />}
            percentage={15}
            description="Monthly increase"
            isPositive={true}
          />
          <Link href={`/generate-invoice`}>
            <FeaturedCard
              title="View All Bills/Invoices"
              value={data?.totalInvoices}
              icon={<FaEye size={24} />}
              percentage={15}
              description="Monthly increase"
              isPositive={true}
            />
          </Link>
          <InventoryOverview />
          <DispatchOverview />
        </div>
      </div>
    </div>
  );
}
