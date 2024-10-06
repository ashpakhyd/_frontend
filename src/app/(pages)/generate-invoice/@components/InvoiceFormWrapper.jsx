import React, { useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import CustomInput from "@/components/commonComponents/TextInput/TextInput";
import CustomTextArea from "@/components/commonComponents/TextArea/TextArea";
import Container from "@/components/commonComponents/Container/Container";
import {
  isValid,
  stateOptions,
  statusOptions,
  woodMeasurementScales,
} from "@/utils/common-utils";
import GlobalDropdown from "@/components/commonComponents/GlobalDropdown/GlobalDropdown";
import PlusIcon from "@/components/icons/PlusIcon";
import CrossIcon from "@/components/icons/CrossArrowIcon";
import { Button, Select } from "@nextui-org/react";
import numWords from "num-words"; // Import num-words library
import { useRouter } from "next/navigation";
import { TbTruckDelivery } from "react-icons/tb";
import { MdAddShoppingCart, MdCalculate } from "react-icons/md";
import { IoArrowBackCircle } from "react-icons/io5";
import { IoIosRemoveCircle, IoMdRemoveCircleOutline } from "react-icons/io";

const InvoiceFormWrapper = ({
  onSubmit,
  handleSubmit,
  control,
  errors,
  watch,
  mode,
  isLoading,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });
  const router = useRouter();
  const products = watch("products");

  const [totals, setTotals] = useState({ subtotal: 0, gst: 0, grandTotal: 0 });

  const calculateTotals = () => {
    let subtotal = 0;
    let gst = 0;
    products.forEach((product) => {
      const qty = parseFloat(product.qty) || 0;
      const price = parseFloat(product.price) || 0;
      const gstPercentage = parseFloat(product.gstPercentage) || 0;

      const productSubtotal = qty * price;
      const productGST = (productSubtotal * gstPercentage) / 100;

      subtotal += productSubtotal;
      gst += productGST;
    });

    const grandTotal = subtotal + gst;
    setTotals({ subtotal, gst, grandTotal });
  };

  return (
    <div className="px-24 mb-20">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        <div className="w-full sticky z-[40] mt-5 flex justify-between my-6 items-center">
          <label className="text-font24  leading-lineHeight36 font-bold flex-start">
            {mode === "create"
              ? "Create Delivery Routes"
              : "Edit Delivery Routes"}
          </label>
          <div className="flex gap-3.5">
            {mode === "edit" && (
              <Controller
                name="status"
                control={control}
                rules={false}
                render={({ field }) => (
                  <GlobalDropdown
                    className="rounded-md"
                    field={field}
                    options={statusOptions}
                    isMulti={false}
                    placeholder="Status"
                    name="status"
                    labelStyle={"dropLabel"}
                    errors={errors}
                    required={false}
                  />
                )}
              />
            )}
            {/* {errors.status && <p>{errors.status.message}</p>} */}
            <Button
              onClick={() => router.back()}
              color="danger"
              variant="bordered"
            >
              <IoArrowBackCircle />
              Back
            </Button>
            <Button
              loading={isLoading}
              className=""
              type="submit"
              color="success"
              variant="ghost"
            >
              Save
              <TbTruckDelivery />
            </Button>
          </div>
        </div>
        <Container>
          <div className="grid grid-cols-3 gap-2">
            <div className="flex-1">
              <Controller
                name="invoiceNumber"
                control={control}
                rules={{ required: "Invoice Number is required" }}
                render={({ field }) => (
                  <CustomInput
                    type="number"
                    label="Invoice Number"
                    placeholder="Enter invoice number"
                    labelPlacement="outside"
                    isInvalid={!!errors.invoiceNumber}
                    errorMessage={errors.invoiceNumber?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="flex-1">
              <Controller
                name="invoiceDate"
                control={control}
                rules={{ required: "Invoice Date is required" }}
                render={({ field }) => (
                  <CustomInput
                    label="Invoice Date"
                    type="date"
                    placeholder="Select date"
                    labelPlacement="outside"
                    isInvalid={!!errors.invoiceDate}
                    errorMessage={errors.invoiceDate?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="flex-1">
              {/* Due Date */}
              <Controller
                name="dueDate"
                control={control}
                rules={{ required: "Due Date is required" }}
                render={({ field }) => (
                  <CustomInput
                    label="Due Date"
                    type="date"
                    placeholder="Select due date"
                    labelPlacement="outside"
                    isInvalid={!!errors.dueDate}
                    errorMessage={errors.dueDate?.message}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
        </Container>
        <Container>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex-1">
              <Controller
                name="clientName"
                control={control}
                rules={{ required: "Client Name is required" }}
                render={({ field }) => (
                  <div className="col-span-4">
                    <CustomInput
                      type="text"
                      label="Client Name"
                      placeholder="Client Name"
                      labelPlacement="outside"
                      isInvalid={!!errors.clientName}
                      errorMessage={errors.clientName?.message}
                      {...field}
                    />
                  </div>
                )}
              />
            </div>
            <div className="flex-1">
              <Controller
                name="companyName"
                control={control}
                rules={{ required: "Company Name is required" }}
                render={({ field }) => (
                  <div className="col-span-4">
                    <CustomInput
                      type="text"
                      label="Company Name"
                      placeholder="Company Name"
                      labelPlacement="outside"
                      isInvalid={!!errors.companyName}
                      errorMessage={errors.companyName?.message}
                      {...field}
                    />
                  </div>
                )}
              />
            </div>
            <div className="flex-1">
              <Controller
                name="gstin"
                control={control}
                rules={{ required: "GSTIN is required" }}
                render={({ field }) => (
                  <div className="col-span-4">
                    <CustomInput
                      type="text"
                      label="GSTIN"
                      placeholder="Enter GST Number"
                      labelPlacement="outside"
                      isInvalid={!!errors.gstin}
                      errorMessage={errors.gstin?.message}
                      {...field}
                    />
                  </div>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex-1">
              <Controller
                name="companyAddress"
                control={control}
                rules={{ required: "Factory Address is required" }}
                render={({ field }) => (
                  <div className="col-span-4">
                    <CustomInput
                      type="text"
                      label="Factory Address"
                      placeholder="Factory Addressame"
                      labelPlacement="outside"
                      isInvalid={!!errors.companyAddress}
                      errorMessage={errors.companyAddress?.message}
                      {...field}
                    />
                  </div>
                )}
              />
            </div>
            <div className="flex-1">
              <Controller
                name="street"
                control={control}
                rules={{ required: "Street/Road is required" }}
                render={({ field }) => (
                  <div className="col-span-4">
                    <CustomInput
                      type="text"
                      label="Street/Road"
                      placeholder="Enter Street/Road"
                      labelPlacement="outside"
                      isInvalid={!!errors.street}
                      errorMessage={errors.street?.message}
                      {...field}
                    />
                  </div>
                )}
              />
            </div>
            <div className="flex-1 mt-4">
              <Controller
                name="state"
                control={control}
                rules={{ required: "State is required" }}
                render={({ field }) => (
                  <div className="col-span-4">
                    <GlobalDropdown
                      field={field}
                      options={stateOptions}
                      isMulti={false}
                      placeholder="Select State"
                      label="Select State"
                      name="state"
                      labelStyle={"dropLabel"}
                      errors={errors}
                      errorMessage="Please select State"
                      required={true}
                    />
                  </div>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="flex-1">
              <Controller
                name="pinCode"
                control={control}
                rules={{ required: "Pin Code is required" }}
                render={({ field }) => (
                  <div className="col-span-4">
                    <CustomInput
                      type="text"
                      label="Pin Code"
                      placeholder="Enter Pin Code"
                      labelPlacement="outside"
                      isInvalid={!!errors.pinCode}
                      errorMessage={errors.pinCode?.message}
                      {...field}
                    />
                  </div>
                )}
              />
            </div>
            {/* <div className="flex-1">
            <Controller
              name="state"
              control={control}
              rules={{ required: "State is required" }}
              render={({ field }) => (
                <div className="col-span-4">
                  <GlobalDropdown
                      field={field}
                      options={stateOptions}
                      isMulti={false}
                      placeholder="Select State"
                      label="Select State"
                      name="state"
                      labelStyle={"dropLabel"}
                      errors={errors}
                      errorMessage="Please select State"
                      required={true}
                    />
                </div>
              )}
            />
          </div> */}
          </div>
        </Container>

        <Container>
          {fields.map((item, index) => (
            <div className="">
              <div key={item.id} className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex-1">
                  <Controller
                    name={`products[${index}].productName`}
                    control={control}
                    rules={{ required: "Product Name is required" }}
                    render={({ field }) => (
                      <CustomInput
                        type="text"
                        label="Product Name"
                        placeholder="Enter Product Name"
                        labelPlacement="outside"
                        isInvalid={!!errors?.products?.[index]?.productName}
                        errorMessage={
                          errors?.products?.[index]?.productName?.message
                        }
                        {...field}
                      />
                    )}
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex-1">
                    <Controller
                      name={`products[${index}].totalPieces`}
                      control={control}
                      rules={{ required: "Total Pieces is required" }}
                      render={({ field }) => (
                        <CustomInput
                          type="number"
                          label="Total Pieces"
                          placeholder="Enter Total Pieces"
                          labelPlacement="outside"
                          isInvalid={!!errors?.products?.[index]?.totalPieces}
                          errorMessage={
                            errors?.products?.[index]?.totalPieces?.message
                          }
                          {...field}
                        />
                      )}
                    />
                  </div>

                  <div className="flex-1">
                    <Controller
                      name={`products[${index}].hsnCode`}
                      control={control}
                      rules={{ required: "HSN Code is required" }}
                      render={({ field }) => (
                        <CustomInput
                          type="number"
                          label="HSN Code"
                          placeholder="Enter HSN Code"
                          labelPlacement="outside"
                          isInvalid={!!errors?.products?.[index]?.hsnCode}
                          errorMessage={
                            errors?.products?.[index]?.hsnCode?.message
                          }
                          {...field}
                        />
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <Controller
                      name={`products[${index}].gstPercentage`}
                      control={control}
                      rules={{ required: "GST % is required" }}
                      render={({ field }) => (
                        <CustomInput
                          type="text"
                          label="GST %"
                          placeholder="Enter GST %"
                          labelPlacement="outside"
                          isInvalid={!!errors?.products?.[index]?.gstPercentage}
                          errorMessage={
                            errors?.products?.[index]?.gstPercentage?.message
                          }
                          {...field}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex-1">
                  <Controller
                    name={`products[${index}].productDescription`}
                    control={control}
                    rules={{ required: "Product Description is required" }}
                    render={({ field }) => (
                      <CustomTextArea
                        placeholder="Enter Product Description"
                        label="Product Description"
                        labelPlacement="outside"
                        isInvalid={
                          !!errors?.products?.[index]?.productDescription
                        }
                        errorMessage="Please enter Product Description"
                        {...field}
                      />
                    )}
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex-1">
                    <Controller
                      name={`products[${index}].qty`}
                      control={control}
                      rules={{ required: "QTY is required" }}
                      render={({ field }) => (
                        <CustomInput
                          type="number"
                          label="QTY"
                          placeholder="Enter Quantity"
                          labelPlacement="outside"
                          isInvalid={!!errors?.products?.[index]?.qty}
                          errorMessage={errors?.products?.[index]?.qty?.message}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  <div className="flex-1 mt-4">
                    <Controller
                      name={`products[${index}].unit`}
                      control={control}
                      rules={{ required: "Measurement Unit is required" }}
                      render={({ field }) => (
                        <GlobalDropdown
                          field={field}
                          options={woodMeasurementScales}
                          isMulti={false}
                          placeholder="Select Unit"
                          label="Unit"
                          labelStyle="dropLabel"
                          errors={errors}
                          errorMessage="Please select a Measurement Unit"
                        />
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <Controller
                      name={`products[${index}].price`}
                      control={control}
                      rules={{ required: "Price is required" }}
                      render={({ field }) => (
                        <CustomInput
                          type="text"
                          label="Price"
                          placeholder="Enter Price"
                          labelPlacement="outside"
                          isInvalid={!!errors?.products?.[index]?.price}
                          errorMessage={
                            errors?.products?.[index]?.price?.message
                          }
                          {...field}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end w-100 ">
                {fields.length > 1 && (
                  <Button
                    className="mt-2"
                    onClick={() => remove(index)}
                    color="warning"
                    variant="ghost"
                  >
                    <IoIosRemoveCircle />
                    Remove Entry
                  </Button>
                )}
              </div>
            </div>
          ))}
          <div className="grid grid-cols-2 gap-2 items-center border-b-2 border-b-gray-1">
            <div className="flex-1 mb-4">
              <Controller
                name="TotalProductPieces"
                control={control}
                rules={{ required: "Total Product Pieces is required" }}
                render={({ field }) => (
                  <CustomInput
                    type="number"
                    label="Total Product Pieces"
                    placeholder="Enter Total Total Product Pieces"
                    labelPlacement="outside"
                    isInvalid={!!errors?.TotalProductPieces}
                    errorMessage={errors?.TotalProductPieces?.message}
                    {...field}
                  />
                )}
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            {" "}
            <Button
              color="primary"
              variant="light"
              className="mt-6 border-none"
              onClick={() =>
                append({
                  hsnCode: "",
                  gstPercentage: "",
                  productName: "",
                  totalPieces: "",
                  productDescription: "",
                  qty: "",
                  state: "",
                  price: "",
                })
              }
            >
              <MdAddShoppingCart />
              Add more
            </Button>
            <div className="mt-6 flex justify-end">
              <div className="p-4 border border-gray-1 rounded-lg shadow-sm bg-lite-bg">
                <div className="text-lg font-semibold text-gray-800">
                  <div className="grid grid-cols-2 gap-2">
                    <p>Subtotal:</p>
                    <p className="text-right font-bold">
                      ₹ {totals.subtotal.toFixed(2)}
                    </p>
                    <p>GST:</p>
                    <p className="text-right font-bold">
                      ₹ {totals.gst.toFixed(2)}
                    </p>
                    <p>Grand Total:</p>
                    <p className="text-right text-xl font-bold text-blue-600">
                      ₹ {totals.grandTotal.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end mt-2">
            <Button
              color="secondary"
              variant="ghost"
              className="w-[16.5vw]"
              onClick={calculateTotals}
              radius="none"
            >
              <MdCalculate />
              Calculate Totals
            </Button>
          </div>
        </Container>

        <Container>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex-1">
              <Controller
                name="truckNumber"
                control={control}
                rules={{ required: "Truck Number is required" }}
                render={({ field }) => (
                  <CustomInput
                    type="text"
                    label="Truck Number"
                    placeholder="Enter Truck number"
                    labelPlacement="outside"
                    isInvalid={!!errors.truckNumber}
                    errorMessage={errors.truckNumber?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="flex-1">
              <Controller
                name="driverName"
                control={control}
                rules={{ required: "Driver Name is required" }}
                render={({ field }) => (
                  <CustomInput
                    type="text"
                    label="Driver Name"
                    placeholder="Enter Driver Name"
                    labelPlacement="outside"
                    isInvalid={!!errors.driverName}
                    errorMessage={errors.driverName?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="flex-1">
              <Controller
                name="ewayBillNumber"
                control={control}
                rules={{ required: "E-Way Bill Number is required" }}
                render={({ field }) => (
                  <CustomInput
                    type="text"
                    label="E-Way Bill Number"
                    placeholder="Enter E-Way Bill Number"
                    labelPlacement="outside"
                    isInvalid={!!errors.ewayBillNumber}
                    errorMessage={errors.ewayBillNumber?.message}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4"></div>
        </Container>

        {/* Submit Button */}
        <Button
          type="submit"
          color="success"
          variant="ghost"
          className="text-xl hover h-[70px] py-2 px-7 w-full "
        >
          Submit Invoice
          <TbTruckDelivery />
        </Button>
      </form>
    </div>
  );
};

export default InvoiceFormWrapper;
