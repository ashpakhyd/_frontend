"use client";
import Loader from "@/components/commonComponents/Loader/Loader";
import { useGetProductByIdQuery } from "@/redux/apiSlices/productsApi";
import ProductViewWrapper from "../@component/productViewWrapper";
import { useState } from "react";
import EditProductWrapper from "../@component/EditProductWrapper";

const ViewProduct = ({ params }) => {
  const [isEditable, setIsEditable] = useState(false);

  const { isFetching, isSuccess, isError, data } = useGetProductByIdQuery({
    productId: params.productId,
  });

  if (isFetching) {
    return (
      <div className="pt-80">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading product data.</div>;
  }
  if (isSuccess) {
    return (
      <>
        {!isEditable ? (
          <ProductViewWrapper data={data} onEdit={() => setIsEditable(true)} />
        ) : (
          <EditProductWrapper
            data={data}
            onCancel={() => setIsEditable(false)}
          />
        )}
      </>
    );
  }
};

export default ViewProduct;
