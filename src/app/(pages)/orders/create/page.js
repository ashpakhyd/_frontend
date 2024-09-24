
"use client"

import OrderForm from "@/components/OrderForm";

const CreateOrderPage = () => {
  return (
    <div className="flex">
      <div className="flex-1">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Create New Order</h1>
          <OrderForm />
        </div>
      </div>
    </div>
  );
};

export default CreateOrderPage;
