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
    const invoiceElement = document.getElementById("invoice"); // The part of the page to convert to PDF
    html2pdf(invoiceElement, {
      margin: 1,
      filename: `Invoice_${invoice?.invoiceNumber}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    });
  };
  const invoiceUrl = `https://shaikhconnect.com/invoice/${invoice?._id}`;
  return (
    <>
      <div className="container mx-auto p-6" id="invoice">
        {/* Header */}
        <Container>
          <div>
           <div className="flex justify-between items-center">
  {/* Company Info Centered */}
  <div className="h-[15vh] flex flex-col justify-center items-center flex-grow">
    <h1 className="text-4xl font-bold">SHAIKH UNITED GROUP</h1>
    <p className="text-lg italic mt-2">ALL TYPES OF WOOD & FURNITURE SUPPLIERS</p>
  </div>
  
  {/* QR Code on the Right */}
  <div className="text-right">
    <QRCode
      value={invoiceUrl}
      size={128}
      logoImage="/logo.png" // Optional logo
      logoWidth={32}
      logoHeight={32}
    />
  </div>
</div>

            <div className="flex justify-between items-center ">
              <p className="text-sm">Contact: 9881649776</p>
              <p className="text-sm">Email: SUGroupEmail@gmail.com</p>
              <p className="text-sm">Website: www.SUGroups.com</p>
            </div>
          </div>
        </Container>

        <Container>
          <div className="flex justify-between">
            <div>
              <h3 className="font-bold text-lg">Bill From:</h3>
              <p>{invoice?.billFrom?.name}</p>
              <p>{invoice?.billFrom?.companyName}</p>
              <p>{invoice?.billFrom?.address}</p>
              <p>
                {invoice?.billFrom?.dist}, {invoice?.billFrom?.state} -{" "}
                {invoice?.billFrom?.pinCode}
              </p>
              <p>GSTIN: 27DTBPA7699A1ZP</p>
            </div>
            <div>
              <h3 className="font-bold text-lg">Bill To:</h3>
              <p>{invoice?.clientName}</p>
              <p>{invoice?.companyName}</p>
              <p>{invoice?.companyAddress}</p>
              <p>
                {invoice?.street}, {invoice?.pinCode}
              </p>
              <p>GSTIN: 36ACUFS2391E1ZP</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Invoice</h2>
              <p>Invoice No: {invoice?.invoiceNumber}</p>
              <p>
                Invoice Date:{" "}
                {new Date(invoice?.invoiceDate).toLocaleDateString()}
              </p>
              <p>Due Date: {new Date(invoice?.dueDate).toLocaleDateString()}</p>
            </div>
          </div>

          <h3 className="font-bold text-lg mt-10 mb-2">Product Details:</h3>
          <table className="w-full border-collapse bg-white mb-10 border border-gray-2 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-2 text-white">
              <th className="border p-2">S.No</th> {/* Serial Number Header */}
                <th className="border p-2">HSN Code</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Qty in CBM</th>
                <th className="border p-2">Price (₹)</th>
                <th className="border p-2">Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              {invoice?.products.map((product, index) => (
                <tr key={product._id} className="bg-light-blue">
                  <td className="border border-gray-1 p-2">{index + 1}</td> {/* Serial Number */}
                  <td className="border border-gray-1 p-2">{product.hsnCode}</td>
                  <td className="border border-gray-1 p-2">{product.productDescription}</td>
                  <td className="border border-gray-1 p-2">{product.qty}</td>
                  <td className="border border-gray-1 p-2">{product.price}</td>
                  <td className="border border-gray-1 p-2">
                    {(product.qty * product.price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Subtotal, GST, and Total Calculation */}
          <div className="flex justify-end my-10">
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
                <p className="font-bold">Total:</p>
                <p className="font-bold">₹{totalAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between my-10">
            <div>
              <h3 className="text-lg font-bold">Vehical Details:</h3>
              <p>Vehical number: {invoice?.truckNumber}</p>
              <p>Driver Name: {invoice?.driverName}</p>
              <p>E-way number: {invoice?.ewayBillNumber}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold">Bank Details:</h3>
              <p>Beneficiary Name: SHAIKH UNITED GROUP</p>
              <p>Account Number: 50200052201980</p>
              <p>Bank Name & Branch: HDFC / GANGAKHED</p>
              <p>IFSC Code: HDFC0003015</p>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-bold">Terms and Conditions:</h3>
            <p>
              1. Payment is due within 15 days of the invoice date unless
              otherwise agreed in writing.
            </p>
            <p>
              2. Late payments will incur a late fee of 2% of the outstanding
              balance per week.
            </p>
            <p>
              3. The goods supplied will remain the property of SHAIKH UNITED
              GROUP until full payment has been received.
            </p>
            <p>
              4. All goods are carefully inspected before delivery; however, any
              damages or discrepancies must be reported within 3 days of
              receipt.
            </p>
            <p>
              5. Any cancellation of orders must be communicated in writing 7
              days prior to the scheduled delivery.
            </p>
            <p>
              6. We reserve the right to delay or cancel delivery if unforeseen
              circumstances (e.g., supply chain issues, weather conditions)
              occur.
            </p>
            <p>
              7. Prices are subject to change without notice, depending on
              market conditions and material availability.
            </p>
            <p>
              8. All dimensions, weights, and quantities stated are approximate
              and may vary slightly.
            </p>
            <p>
              9. Any legal disputes arising will be handled under the
              jurisdiction of Parbhani, Maharashtra.
            </p>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p>
              This is a computer-generated invoice, no signature is required.
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
