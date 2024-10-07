// /orders/edit/page.js
"use client"
// import { useRouter } from 'next/router';

// import OrderForm from "@/components/OrderForm";
// import { mockOrdersData } from "@/data/mockOrdersData"; // Use mock data

const EditOrderPage = () => {
  // const router = useRouter();
  // const { id } = router.query;

  // const order = mockOrdersData.find(order => order.id === id); // Fetch order details

  // if (!order) {
  //   return <div>Order not found</div>;
  // }

  return (
    <div className="flex">
      <div className="flex-1">
        <div className="p-6">
          {/* <h1 className="text-2xl font-bold mb-6">Edit Order #{order.orderNumber}</h1> */}
          {/* <OrderForm initialData={order} /> */}
        </div>
      </div>
    </div>
  );
};

export default EditOrderPage;
