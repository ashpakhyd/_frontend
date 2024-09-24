// @components/OrderStatusDropdown.js

"use client"
const OrderStatusDropdown = ({ onChange, value }) => {
    return (
      <select onChange={onChange} value={value} className="p-2 border rounded w-full">
        <option value="">Select Status</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
        <option value="Shipped">Shipped</option>
      </select>
    );
  };
  
  export default OrderStatusDropdown;
  