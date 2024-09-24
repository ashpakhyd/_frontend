// @components/DispatchOverview.js
import FeaturedCard from "./FeaturedCard";
import { FaShippingFast } from "react-icons/fa";

const DispatchOverview = () => {
  const dispatchCount = 60;  // Static value
  const dispatchGrowth = 20; // Static growth percentage

  return (
    <FeaturedCard
      title="Items Dispatched"
      value={dispatchCount}
      icon={<FaShippingFast size={24} />}
      percentage={dispatchGrowth}
      description="Monthly increase"
      isPositive={true}
    />
  );
};

export default DispatchOverview;
