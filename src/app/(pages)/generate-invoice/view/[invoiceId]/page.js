"use client";
import {
  useGetInvoiceByIdQuery,
  useUpdateInvoiceMutation,
} from "@/redux/apiSlices/invoiceApi";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import InvoiceFormWrapper from "../../@components/InvoiceFormWrapper";
import { FaTruck, FaUserAlt } from "react-icons/fa";
import html2pdf from "html2pdf.js";
import { Button } from "@nextui-org/react";
import Container from "@/components/commonComponents/Container/Container";
import { QRCode } from "react-qrcode-logo";
import "./style.css";
const ViewInvoice = ({ params }) => {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {},
  });

  const { data: invoiceData, isLoading: loadingById } = useGetInvoiceByIdQuery(
    params?.invoiceId
  );
  const invoice = invoiceData?.invoice;

  //   useEffect(() => {
  //     if (invoiceData && invoiceData?.invoice) {
  //       reset({ ...invoiceData?.invoice });
  //     }
  //   }, [invoiceData, reset]);

  //   const [updateInvoice, { data, isLoading, isSuccess }] =
  //     useUpdateInvoiceMutation();

  //   useEffect(() => {
  //     if (isSuccess) {
  //       if (data.success) {
  //         toast.success(data?.message);
  //         router.push("/generate-invoice");
  //       } else {
  //         toast.error(data.message || "An error occurred");
  //       }
  //     }
  //   }, [isSuccess]);

  //   const onSubmit = (formData) => {
  //     // Include the invoice ID when updating
  //     updateInvoice({ id: params?.invoiceId, body: formData });
  //   };

  // Calculation logic for subtotal, GST, and total
  const subtotal =
    invoice?.products.reduce(
      (acc, product) => acc + product.qty * product.price,
      0
    ) || 0;
  const gstPercentage = 18; // Assuming a flat 18% GST for all products
  const gstAmount = (subtotal * gstPercentage) / 100;
  const totalAmount = subtotal + gstAmount;

  const handlePrint = () => {
    const invoiceContent = document.getElementById("invoice").innerHTML; // Get the invoice HTML
    const originalContent = document.body.innerHTML; // Save the original content of the page

    document.body.innerHTML = invoiceContent; // Replace body content with the invoice content
    window.print(); // Trigger the print

    document.body.innerHTML = originalContent; // Restore the original content after printing
    window.location.reload(); // Reload to restore JavaScript functionality after DOM is altered
  };

  const handleDownloadPdf = () => {
    const element = document.getElementById("invoice"); // Ensure this is the correct ID
    const opt = {
      margin: 0.5,
      filename: `Invoice_${invoice?.invoiceNumber}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, logging: true, letterRendering: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  const invoiceUrl = `https://shaikhconnect.com/invoice/${invoice?._id}`;
  return (
    <>
      <div
        className="container mx-auto p-6"
        id="invoice"
        style={{ width: "794px" }}
      >
        {/* Header */}

        <Container>
          <div>
            <div className="flex justify-between items-center h-10 p-2">
              {/* Logo on the Left */}
              <div className="flex items-center">
                <img src="/favicon.png" alt="Logo" className="h-[80px]" />
              </div>

              {/* Company Info Centered */}
              <div className=" flex flex-col justify-center items-center flex-grow">
                <h1 className="text-2xl font-bold">SHAIKH UNITED GROUP</h1>
                <p className="text-xs italic mt-2">
                  ALL TYPES OF WOOD & FURNITURE SUPPLIERS
                </p>
                <p className="text-xs flex justify-end w-full mt-4 text-success">INVOICE ID: {invoice?._id}</p>
              </div>

              {/* <div className="text-right h-15 w-5">
                  <QRCode
                    value={invoiceUrl}
                    size={128}
                    logoImage="/logo.png"
                    logoWidth={32}
                    logoHeight={32}
                  />
                </div> */}
            </div>
          </div>
          <hr className="mb-2 mt-8 text-gray-1" />

          <div className="flex justify-between text-xs">
            <div>
              <h3 className="font-bold">Bill From:</h3>
              <p>{invoice?.billFrom?.name}</p>
              <p>{invoice?.billFrom?.companyName}</p>
              <p>Office: 1st floor, Happy house</p>
              <p>Tq. Gangakhed Dist. Parbhani</p>
              <p>Maharashtra-431514</p>
              <p>
                {invoice?.billFrom?.state} - {invoice?.billFrom?.pinCode}
              </p>
              <p>GSTIN: 27DTBPA7699A1ZP</p>
            </div>
            <div>
              <h3 className="font-bold ">Bill To:</h3>
              <p>{invoice?.clientName}</p>
              <p>{invoice?.companyName}</p>
              <p>{invoice?.companyAddress}</p>
              <p>
                {invoice?.street}, {invoice?.pinCode}
              </p>
              <p>GSTIN: {invoice?.gstin}</p>
            </div>
            <div>
              <h2 className="text-xl font-bold">Invoice</h2>
              <p>Invoice No: {invoice?.invoiceNumber}</p>
              <p>
                Invoice Date:{" "}
                {new Date(invoice?.invoiceDate).toLocaleDateString()}
              </p>
              <p>Due Date: {new Date(invoice?.dueDate).toLocaleDateString()}</p>
            </div>
          </div>
          <hr className="my-4 text-gray-1" />

          <h3 className="font-bold text-xs mt-2 mb-2 flex justify-start">Product Details:</h3>
          <table className="table-thin-border">
            <thead className="heading">
              <tr >
                <th>S.No</th> {/* Serial Number Header */}
                <th>HSN Code</th>
                <th>Description</th>
                <th>Qty in CBM</th>
                <th>Price (₹)</th>
                <th>Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              {invoice?.products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td> {/* Serial Number */}
                  <td>{product.hsnCode}</td>
                  <td>{product.productDescription}</td>
                  <td>{product.qty}</td>
                  <td>{product.price}</td>
                  <td>{(product.qty * product.price).toFixed(2)}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="1">&nbsp;</td>
                <td colSpan="1">&nbsp;</td>
                <td colSpan="1">&nbsp;</td>
                <td colSpan="1">&nbsp;</td>
                <td colSpan="1">&nbsp;</td>
                <td colSpan="1">&nbsp;</td>
              </tr>
            </tbody>
          </table>

          {/* Subtotal, GST, and Total Calculation */}
          <div className="flex justify-between my-2 text-xs">
            <div>
              <h3 className="text-xm font-bold">Vehical Details:</h3>
              <p>Vehical number: {invoice?.truckNumber}</p>
              <p>Driver Name: {invoice?.driverName}</p>
              <p>E-way number: {invoice?.ewayBillNumber}</p>
            </div>
            <div className="w-1/3">
              <div className="flex justify-between">
                <p className="font-bold">Subtotal:</p>
                <p>₹{subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-bold">GST ({gstPercentage}%):</p>
                <p>₹{gstAmount.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-bold">Total Amount:</p>
                <p className="font-bold">₹{totalAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <hr className="text-gray-1 my-4" />
          <div className="flex flex-row-reverse space-x-4 space-x-reverse gap-[10vw] text-xs">
            <div className="flex flex-col">
              <p className="font-bold">Authorised By</p>
              <p>SHAIKH UNITED GROUP</p>
            </div>
            <div className="flex flex-col">
              <p className="font-bold">Client</p>
              <p>{invoice?.companyName}</p>
            </div>
          </div>
          <div className="flex justify-center text-xs mt-2">
            <p>
              This is a computer-generated invoice, no signature is required.
            </p>
          </div>
          <hr className="my-4 text-gray-1" />
          <div className="mb-6 text-xs">
            <div className="flex justify-between my-2">
              <div>
                <label className="text-black font-bold">
                  Feel free to contact us:
                </label>
                <p className="text-xs">Contact: 9881649776</p>
                <p className="text-xs">Email: SUGroupEmail@gmail.com</p>
                <p className="text-xs">Website: www.SUGroups.com</p>
              </div>

              <div>
                <h3 className="text-black font-bold">Bank Details:</h3>
                <p>Beneficiary Name: SHAIKH UNITED GROUP</p>
                <p>Account Number: 50200052201980</p>
                <p>Bank Name & Branch: HDFC / GANGAKHED</p>
                <p>IFSC Code: HDFC0003015</p>
              </div>
            </div>

            <hr className="text-gray-1 my-4" />
            <h3 className="text-xs font-bold text-pretty">
              Terms and Conditions:
            </h3>
            <p className="text-xs text-gray-2 text-pretty">
              * Payments are due within 15 days of the invoice date, with a 2%
              weekly late fee on overdue balances. Full ownership of goods
              remains with SHAIKH UNITED GROUP until payment is fully cleared.
            </p>
            <p className="text-xs text-gray-2 text-pretty">
              * Goods must be inspected within 3 days of delivery for any
              discrepancies. Cancellations require a written notice 7 days
              before the scheduled delivery. Deliveries may be delayed or
              canceled due to unforeseen circumstances without liability.
            </p>
            <p className="text-xs text-gray-2 text-pretty">
              * Prices and specifications, including dimensions and weights, are
              subject to change based on market conditions without prior notice.
            </p>
            <p className="text-xs text-gray-2 text-pretty">
              * All disputes will be governed under the jurisdiction of
              Parbhani, Maharashtra.
            </p>
          </div>
        </Container>

        {/* Terms and Conditions */}
        {/* Terms and Conditions */}
      </div>
      <div className="mt-4 flex justify-center my-8">
        <Button
          className="bg-gray-1 hover:bg-blue-700  font-bold py-2 px-4 rounded"
          onClick={handlePrint}
        >
          Print Invoice
        </Button>
        <Button
          className="bg-green-1 hover:bg-green-700  font-bold py-2 px-4 rounded ml-2"
          onClick={handleDownloadPdf}
        >
          Download PDF
        </Button>
        <Button
          className="bg-blue-3 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
          onClick={""}
        >
          Send Invoice via Email
        </Button>
      </div>
    </>
  );
};

export default ViewInvoice;
