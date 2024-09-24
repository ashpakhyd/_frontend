// @components/OrderList.js
"use client"

import Link from 'next/link';
import BulkActions from './BulkActions';

const mockOrdersData = [
  { id: '1', orderNumber: '1001', customer: 'John Doe', status: 'Pending' },
  { id: '2', orderNumber: '1002', customer: 'Jane Smith', status: 'Completed' },
];

const OrderList = () => {
  return (
    <div>
      <BulkActions />
      <table className="min-w-full mt-4">
        <thead>
          <tr>
            <th className="border px-4 py-2">Order Number</th>
            <th className="border px-4 py-2">Customer</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mockOrdersData.map(order => (
            <tr key={order.id}>
              <td className="border px-4 py-2">{order.orderNumber}</td>
              <td className="border px-4 py-2">{order.customer}</td>
              <td className="border px-4 py-2">{order.status}</td>
              <td className="border px-4 py-2">
              <Link href={`/orders/edit/${order.id}`}>
                  <span className="text-blue-500 cursor-pointer">Edit</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
