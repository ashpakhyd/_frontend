// @components/InventoryOverview.js
import FeaturedCard from "./FeaturedCard";
import { FaWarehouse } from "react-icons/fa";

const InventoryOverview = () => {
  const inventoryCount = 250; // Static value
  const inventoryGrowth = 5;  // Static growth percentage

  return (
    <FeaturedCard
      title="Inventory Items"
      value={inventoryCount}
      icon={<FaWarehouse size={24} />}
      percentage={inventoryGrowth}
      description="In stock"
      isPositive={true}
    />
  );
};

export default InventoryOverview;
