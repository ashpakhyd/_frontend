import DashboardIcon from "@/icons/sidebar/Dashboard";
import OrderIcon from "@/icons/sidebar/Order";
import CustomersIcon from "@/icons/sidebar/Customers";
import ContentIcon from "@/icons/sidebar/Content";
import AnalyticsIcon from "@/icons/sidebar/Analytics";
import DiscountsIcon from "@/icons/sidebar/Discounts";
import ProductsIcon from "@/icons/sidebar/Products";
import Users from "../icons/sidebar/Users";
import Coupons from "../icons/sidebar/Coupons";
import StaticPages from "../icons/sidebar/StaticPages";
import DeliveryRoutes from "../icons/sidebar/DeliveryRoutes";
import OpenBox from "../icons/sidebar/OpenBox";
import GobaSettings from "../icons/sidebar/GlobalSettings";

export const SidebarRoutes = [
  {
    title: "Orders",
    icon: <OrderIcon />,
    path: "/orders",
    query: { limit: 10, page: 1, sortField: "createdAt", sortOrder: "DESC" },
  },
  {
    title: "Products",
    icon: <ProductsIcon />,
    path: "/products",
    query: { limit: 10, page: 1 },
    isDropdown: true,
    children: [
      {
        title: "Categories",
        path: "/categories",
        query: { limit: 10, page: 1 },
      },
      { title: "Brands", path: "/brands", query: { limit: 10, page: 1 } },
      { title: "Bundles", path: "/bundles", query: { limit: 10, page: 1 } },
    ],
  },
  {
    title: "Open Box",
    icon: <OpenBox />,
    path: "/openbox",
    query: { limit: 10, page: 1 },
    isDropdown: true,
    children: [
      {
        title: "Store Management",
        path: "/store",
        query: { limit: 10, page: 1 },
      },
      {
        title: "Conditions Management",
        path: "/conditions",
        query: { limit: 10, page: 1 },
      },
      { title: "Open Box", path: "/openbox", query: { limit: 10, page: 1 } },
      {
        title: "Filters",
        path: "/filters",
        query: { limit: 10, page: 1 },
      },
    ],
  },
  {
    title: "Customers",
    icon: <CustomersIcon />,
    path: "/customers",
    query: { limit: 10, page: 1, sortField: "createdAt", sortOrder: "DESC" },
  },
  {
    title: "Coupons",
    icon: <Coupons />,
    path: "/coupons",
    query: { limit: 10, page: 1, sortField: "createdAt", sortOrder: "DESC" },
  },
  {
    title: "Discounts",
    icon: <DiscountsIcon />,
    path: "/discount",
    query: { limit: 10, page: 1, sortField: "createdAt", sortOrder: "DESC" },
    isDropdown: true,
    children: [
      {
        title: "Add On Funtionality",
        // icon: <DiscountsIcon />,
        path: "/addons",
        query: { limit: 10, page: 1 },
      },
      {
        title: "Warranty  Funtionality",
        // icon: <DiscountsIcon />,
        path: "/warranty",
        query: { limit: 10, page: 1 },
      },
    ],
  },
  {
    title: "Delivery Routes",
    icon: <DeliveryRoutes />,
    path: "/deliveryroute",
    query: { limit: 10, page: 1, sortField: "createdAt", sortOrder: "DESC" },
    isDropdown: true,
    children: [
      {
        title: "Route Management",
        // icon: <DiscountsIcon />,
        path: "/routemanagement",
        query: { limit: 10, page: 1 },
      },
      {
        title: "Product Assignment",
        // icon: <DiscountsIcon />,
        path: "/productassignment",
        query: { limit: 10, page: 1 },
      },
      {
        title: "Delivery Methods",
        // icon: <DiscountsIcon />,
        path: "/deliverymethods",
        query: { limit: 10, page: 1 },
      },
      {
        title: "Inventory Management",
        // icon: <DiscountsIcon />,
        path: "/inventorymanagement",
        query: { limit: 10, page: 1 },
      },
      {
        title: "Analytics",
        // icon: <DiscountsIcon />,
        path: "/analytics",
        query: { limit: 10, page: 1 },
      },
    ],
  },
  {
    title: "Static Pages",
    icon: <StaticPages />,
    path: "/managestaticpages",
    query: { limit: 10, page: 1, sortField: "createdAt", sortOrder: "DESC" },
    isDropdown: true,
    children: [
      {
        title: "Terms & Condition",
        // icon: <DiscountsIcon />,
        path: "/managestaticpages",
        query: { limit: 10, page: 1 },
      },
     
    ],
  },
  {
    title: "Users",
    icon: <Users />,
    path: "/users",
    query: { limit: 10, page: 1, sortField: "createdAt", sortOrder: "DESC" },
  },
  {
    title: "Global Settings",
    icon: <GobaSettings />,
    path: "/globalsettings",
    query: { limit: 10, page: 1, sortField: "createdAt", sortOrder: "DESC" },
  },
];
