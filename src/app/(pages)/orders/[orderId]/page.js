"use client";
import React, { useRef } from "react";
import Container from "@/components/commonComponents/Container/Container";
import DownloadInvoiceIcon from "@/components/icons/invoice/DownloadInvoiceIcon";
import InvoiceIcon from "@/components/icons/invoice/InvoiceIcon";
import { useGetOrdersByIdQuery } from "@/redux/apiSlices/orderApi";
import  html2pdf  from "html2pdf.js";

const OrderDetails = ({ params }) => {
  // Hook always runs
  const { data, isLoading, isSuccess } = useGetOrdersByIdQuery(params?.orderId);

  // Ref for the invoice section
  const invoiceRef = useRef();

  const printInvoice = () => {
    window.print();
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isSuccess || !data) {
    return <p>Order details not available.</p>;
  }

  const orderDetails = data?.data;
  const { user, orderItems, billingAddress, shippingAddress, orderId } =
    orderDetails;

  const downloadInvoice = () => {
    const element = invoiceRef.current;

    const options = {
      margin: [0.5, 0.5, 0.5, 0.5],
            filename: 'invoice.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2,
        useCORS: true
       },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf()
      .from(element)
      .set(options)
      .save();
  };
  return (
    <div className=" p-6 rounded-[0.75rem] relative">
      <div className="grid grid-cols-350 gap-4 items-start" ref={invoiceRef}>
        <div className="pb-9 shadow-main rounded">
          <label className="font-semibold text-xl mx-2">Orders Details</label>
          <Container className={"text-gray-2 mt-5"}>
            <h2 className="text-sm font-semibold text-gray-2">
              Type of Delivery
            </h2>
            <p className="text-sm">{billingAddress?.isShipping ? "Pickup" : "Delivery"}</p>
          </Container>
          {orderItems?.map((item) => (
            <Container className={"text-gray-2 mt-5"} key={item?.productSKU || index}>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="grid grid-cols-2">
                  <div>
                    <h2 className="text-sm font-semibold">Item</h2>
                    <p className="text-sm">{item?.productSKU}</p>
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold">Brand</h2>
                    <p className="text-sm">
                      {item?.brand ? item?.brand?.brandName : "N/A"}
                    </p>
                  </div>

                  <div className="my-4">
                    <h2 className="text-sm font-semibold">Product Name</h2>
                    <p className="text-sm ">{item?.productName}</p>{" "}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold">Qty</p>
                    <p className="text-sm">{item?.quantity}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Amount</p>
                    <p className="text-sm">${item?.total}</p>
                  </div>
                </div>
              </div>
            </Container>
          ))}
        </div>
        <div className="mt-7">
          <Container className={"mt-5"}>
            <label className="font-semibold text-xm">Delivery Address:</label>
            <p className="text-gray-2 text-sm mt-3">{billingAddress?.address1} {billingAddress?.city} {billingAddress?.state} {billingAddress?.zipCode} {billingAddress?.country}
            </p>
          </Container>
          <Container className={"mt-5"}>
            <label className="font-semibold text-xm">Order Summary</label>
            <p className=" mt-3 flex justify-between text-sm text-gray-2">
              Sales ID:{" "}
              <span className="font-medium text-sm text-gray-2">#{data?.orderId}</span>
            </p>
            <p className=" mt-3 flex justify-between text-sm text-gray-2">
              Subtotal After Discount:{" "}
              <span className=" font-medium text-sm text-gray-2">${(data?.data?.subTotal)-(data?.data?.savings)}</span>
            </p>
            <p className=" mt-3 flex justify-between text-sm text-gray-2 ">
              Tax Total:{" "}
              <span className="font-medium text-sm text-gray-2">${data?.data?.tax}</span>
            </p>
            <p className=" mt-4 flex justify-between border-b table-border-bt-gray"></p>
            <p className=" mt-3 flex justify-between text-sm text-gray-2 font-medium">
              Order Total:{" "}
              <span className="font-medium text-sm text-gray-2">${data?.data?.totalAmount}</span>
            </p>
            <p className=" mt-4 flex justify-between border-b table-border-bt-gray"></p>
            <div className="mt-3 flex justify-between ">
              <p
                className=" text-sm text-gray-2 flex justify-between items-center gap-2 cursor-pointer"
                onClick={printInvoice}
              >
                <InvoiceIcon /> View Invoice
              </p>
              <span className="text-sm text-gray-2 flex justify-between items-center gap-2 cursor-pointer" onClick={downloadInvoice}>
                <DownloadInvoiceIcon /> Download Invoice
              </span>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
