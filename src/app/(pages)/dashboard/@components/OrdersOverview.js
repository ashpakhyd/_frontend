// @components/OrdersOverview.js
import FeaturedCard from "./FeaturedCard";
import { FaBoxOpen } from "react-icons/fa";

const OrdersOverview = () => {
  const ordersCount = 120; // Static for now
  const orderGrowth = 15;  // Static growth percentage

  return (
    <FeaturedCard
      title="Total Orders"
      value={ordersCount}
      icon={<FaBoxOpen size={24} />}
      percentage={orderGrowth}
      description="Monthly increase"
      isPositive={true}
    />
  );
};

export default OrdersOverview;
