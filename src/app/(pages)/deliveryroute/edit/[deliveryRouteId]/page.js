"use client";
import React, { useEffect, useState } from "react";
import DeliveryRoutesWrapper from "../../@components/DeliveryRoutesWrapper";
import {
  useCreateDeliveryRoutesMutation,
  useGetDeliveryRoutesByIdQuery,
  useUpdateDeliveryRoutesMutation,
} from "@/redux/apiSlices/deliveryRoutes";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const EditDeliveryRoutes = ({ params }) => {
  const router = useRouter();
  const [selectedDates, setSelectedDates] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [category, setCategory] = useState("");
  const [routeClass, setRouteClass] = useState("");
  const [routeType, setRouteType] = useState("");

  const disableDeliveryFee =
    routeClass === 4 && (routeType === 2 || routeType === 1) ? true : false;

  //#1 USEFORM DATA...
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      daysActive: [
        { id: 1, name: "MONDAY", isActive: false },
        { id: 2, name: "TUESDAY", isActive: false },
        { id: 3, name: "WEDNESDAY", isActive: false },
        { id: 4, name: "THURSDAY", isActive: false },
        { id: 5, name: "FRIDAY", isActive: false },
        { id: 6, name: "SATURDAY", isActive: false },
        { id: 7, name: "SUNDAY", isActive: false },
      ],
    },
  });

  const { data: deliveryRouteData, isLoading: loadingById } =
    useGetDeliveryRoutesByIdQuery(params?.deliveryRouteId);
    const normalizedItems = deliveryRouteData?.data?.validItems.map(
      (item) => item.productId?.productId || item.productId
    );
  useEffect(() => {
    if (deliveryRouteData && deliveryRouteData?.data) {
      reset({ ...deliveryRouteData?.data });
      setSelectedDates(deliveryRouteData?.data?.disabledDates);
      setCheckedItems(normalizedItems);
    
    }
  }, [deliveryRouteData, reset]);
  
  console.log("normalizedItems", normalizedItems)
  //#2 CLEARING FIELDS WHICH IS NOT REQUIRE...
  useEffect(() => {
    if (disableDeliveryFee) {
      setValue("deliveryFee", "");
    }
    if (category) {
      setValue("subCategoryId", "");
    }
  }, [disableDeliveryFee, category, setValue]);

  //#4 CREATE DELIVERY ROUTES API: POST METHOD...
  const [updateDeliveryRoutes, { data, isLoading, isSuccess }] =
    useUpdateDeliveryRoutesMutation();

  //#5 ROUTING PAGE WHEN DELIVERY ROUTE CREATED...
  useEffect(() => {
    if (isSuccess) {
      if (data.success) {
        toast.success(data?.message);
        router.push("/deliveryroute");
      } else {
        toast.error(data.message || "An error occurred");
      }
    }
  }, [isSuccess]);

  //#6 SUBMIT CREATE ROUTE FORM + updatedData() FOR DELETE OR ADD SOME CONDITION IN FORM...
  const onSubmit = (formData) => {
    if (formData?.showCalendarToCustomer && selectedDates?.length === 0) {
      toast.error("Please select at least one date.");
      return;
    }
    if (checkedItems?.length === 0) {
      toast.error("Please select at least one product.");
      return;
    }
    console.log("checkedItems", checkedItems)
    const updatedData = {
      ...formData,
      deliveryFee: parseFloat(formData.deliveryFee),
      routeTypeId: parseFloat(formData.routeTypeId),
      routeClassId: parseFloat(formData.routeClassId),

      validItems: checkedItems.map((id) => ({ productId: id })),
      disabledDates: selectedDates,
    };
    delete updatedData.categoryId;
    delete updatedData.subCategoryId;
    disableDeliveryFee && delete updatedData.deliveryFee;
    updateDeliveryRoutes(updatedData);
  };

  return (
    <>
    
      <DeliveryRoutesWrapper
        mode={"edit"}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        control={control}
        errors={errors}
        watch={watch}
        setSelectedDates={setSelectedDates}
        selectedDates={selectedDates}
        checkedItems={checkedItems}
        setCheckedItems={setCheckedItems}
        isLoading={isLoading}
        disableDeliveryFee={disableDeliveryFee}
        setRouteType={setRouteType}
        setRouteClass={setRouteClass}
        setCategory={setCategory}
        getValues={getValues}
      />
    </>
  );
};

export default EditDeliveryRoutes;
