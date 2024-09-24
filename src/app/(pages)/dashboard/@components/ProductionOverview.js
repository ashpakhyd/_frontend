// @components/ProductionOverview.js
import FeaturedCard from "./FeaturedCard";
import { FaCogs } from "react-icons/fa";

const ProductionOverview = () => {
  const productionCount = 80; // Static value
  const productionGrowth = -10; // Static drop percentage

  return (
    <FeaturedCard
      title="Generate New Bill"
      value={productionCount}
      icon={<FaCogs size={24} />}
      percentage={productionGrowth}
      description="Monthly decrease"
      isPositive={false}
    />
  );
};

export default ProductionOverview;
