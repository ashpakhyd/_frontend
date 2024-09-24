// @components/FeaturedCard.js
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const FeaturedCard = ({ title, value, icon, percentage, description, isPositive }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between h-48">
      <div className="flex items-center">
        <div className="bg-blue-100 text-blue-500 rounded-full p-4">
          {icon}
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-4xl font-semibold mt-2">{value}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center">
          {isPositive ? (
            <FaArrowUp className="text-green-500 mr-1" />
          ) : (
            <FaArrowDown className="text-red-500 mr-1" />
          )}
          <p className={`${isPositive ? "text-green-500" : "text-red-500"} text-sm font-medium`}>
            {percentage}%
          </p>
        </div>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default FeaturedCard;
