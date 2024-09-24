import { FaTachometerAlt, FaBoxOpen, FaWarehouse, FaCogs, FaShippingFast, FaUsers, FaTruckLoading, FaFileInvoiceDollar, FaChartLine, FaUserShield, FaTools } from "react-icons/fa";

export const SidebarRoutes = [
  {
    title: "DASHBOARD",
    icon: <FaTachometerAlt />,
    path: "/dashboard",
  },
  {
    title: "ORDERS",
    icon: <FaBoxOpen />,
    path: "/orders",
    query: { limit: 10, page: 1, sortField: "orderDate", sortOrder: "DESC" },
    isDropdown: false,
  },
  {
    title: "INVENTORY",
    icon: <FaWarehouse />,
    path: "/inventory",
    isDropdown: true,
    children: [
      {
        title: "Raw Materials",
        path: "/inventory/raw-materials",
      },
      {
        title: "Finished Goods",
        path: "/inventory/finished-goods",
      },
    ],
  },
  {
    title: "PRODUCTION",
    icon: <FaCogs />,
    path: "/production",
    query: { limit: 10, page: 1, sortField: "startDate", sortOrder: "ASC" },
    isDropdown: false,
  },
  {
    title: "DISPATCH & LOGISTICS",
    icon: <FaShippingFast />,
    path: "/dispatch",
  },
  {
    title: "CUSTOMERS",
    icon: <FaUsers />,
    path: "/customers",
  },
  {
    title: "SUPPLIERS",
    icon: <FaTruckLoading />,
    path: "/suppliers",
  },
  {
    title: "PRODUCTS",
    icon: <FaCogs />,
    path: "/products",
  },
  {
    title: "BILLING",
    icon: <FaFileInvoiceDollar />,
    path: "/generate-invoice",
    query: { limit: 10, page: 1, sortField: "createdAt", sortOrder: "DESC" },
    isDropdown: true,
    children: [
      {
        title: "Generate Invoice",
        path: "/generate-invoice/create",
      },
    ],
  },
  {
    title: "REPORTS",
    icon: <FaChartLine />,
    path: "/reports",
  },
  {
    title: "USER MANAGEMENT",
    icon: <FaUserShield />,
    path: "/user-management",
  },
  {
    title: "SETTINGS",
    icon: <FaTools />,
    path: "/settings",
  },
];
