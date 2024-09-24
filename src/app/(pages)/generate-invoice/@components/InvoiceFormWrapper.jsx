import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import CustomInput from "@/components/commonComponents/TextInput/TextInput";
import CustomTextArea from "@/components/commonComponents/TextArea/TextArea";
import CustomButton from "@/components/commonComponents/Button/Button";
import Container from "@/components/commonComponents/Container/Container";
import { isValid, stateOptions, woodMeasurementScales } from "@/utils/common-utils";
import GlobalDropdown from "@/components/commonComponents/GlobalDropdown/GlobalDropdown";
import PlusIcon from "@/components/icons/PlusIcon";
import CrossIcon from "@/components/icons/CrossArrowIcon";
import { Button } from "@nextui-org/react";

const InvoiceFormWrapper = ({
  onSubmit,
  handleSubmit,
  control,
  errors,
  watch,
  mode,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });
  return (
    <div className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        <h2 className="text-xl font-bold">Invoice Form</h2>
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
          <div className="grid grid-cols-2 gap-2">
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
          </div>
          <div className="grid grid-cols-2 gap-2">
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
          </div>
          <div className="grid grid-cols-2 gap-2">
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
          <div className="grid grid-cols-2 gap-2">
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
            <div className="border-b-2 border-b-gray-1">
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

              <div className="flex justify-end w-100 mb-4">
                {fields.length > 1 && (
                 
                      <Button  className="mt-2" onClick={() => remove(index)} color="danger" variant="bordered" startContent={ <CrossIcon /> }>
                      Remove Entry
                    </Button>
                )}
              </div>
            </div>
          ))}
           <Button color="primary" variant="shadow"  className="mt-6"
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
            }>
       <PlusIcon fill={"#fff"}/> Add more
      </Button>  
          
        </Container>

        <Container>
          <div className="grid grid-cols-2 gap-2">
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
          </div>
         <div className="grid grid-cols-2 gap-2 mt-4">
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
       
        </Container>      

        {/* Submit Button */}
        <CustomButton
          type="submit"
          className="bg-primaryBtn text-white py-2 px-7"
        >
          Submit Invoice
        </CustomButton>
      </form>
    </div>
  );
};

export default InvoiceFormWrapper;
