import React from "react";
import Container from "@/components/commonComponents/Container/Container";
import CustomInput from "@/components/commonComponents/TextInput/TextInput";
import { Title } from "@/components/commonComponents/Titles/Titles";
import { Controller } from "react-hook-form";
import { isValid } from "@/utils/common-utils";

const ProductPriceContainer = ({ control, errors, watch }) => {
  const {salePrice, mapPmap} = watch();
  
  return (
    <Container>
      <Title className="mb-4">Pricing</Title>

      <div className="grid grid-cols-2 grid-rows-2 gap-4 ">
        <Controller
          name="mapPmap"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Please enter map/pmap",
            },
            max: {
              value: 999999,
              message: "map/pmap cannot exceed 999999",
            },
            min: {
              value: 100,
              message: "Minimum map/pmap must be greater than 99",
            },
          }}
          render={({ field }) => (
            <CustomInput
              type="text"
              placeholder="E.g. $3999"
              label="MAP/PMAP"
              labelPlacement="outside"
              isInvalid={isValid("mapPmap", errors)}
              errorMessage={errors.mapPmap?.message || ""}
              {...field}
            />
          )}
        />
        <Controller
          name="salePrice"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Please enter sale price",
            },
            max: {
              value: 9999,
              message: "Sale price cannot exceed 999999",
            },
            min: {
              value: 100,
              message: "Minimum sale price must be greater than 99",
            },
          }}
          render={({ field }) => (
            <CustomInput
              type="text"
              placeholder="E.g. $3594"
              label="Sale Price"
              labelPlacement="outside"
              isInvalid={isValid("salePrice", errors)}
              errorMessage={errors.salePrice?.message || ""}
              {...field}
            />
          )}
        />
        <Controller
          name="msrp"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Please enter msrp",
            },
            min: {
              value: salePrice > mapPmap ? salePrice : mapPmap,
              message: "MSRP should be greater than or equals to MAP/PMAP and Sale Price",
            },
          }}
          render={({ field }) => (
            <CustomInput
              type="text"
              placeholder="E.g. $3200"
              label="MSRP"
              labelPlacement="outside"
              isInvalid={isValid("msrp", errors)}
              errorMessage={errors.msrp?.message || ""}
              {...field}
            />
          )}
        />
      </div>
    </Container>
  );
};

export default ProductPriceContainer;
