import React from "react";
import Container from "@/components/commonComponents/Container/Container";
import CustomInput from "@/components/commonComponents/TextInput/TextInput";
import { Controller } from "react-hook-form";
import { isValid } from "@/utils/common-utils";

const BunldesPageLimit = ({ control, errors, watch }) => {
    return (
        <Container>
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
                <Controller
                    name="bundlePageLimit"
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: "Please enter Bundle page limit",
                        },
                        max: {
                            value: 999999,
                            message: "Bundle page limit cannot exceed 999999",
                        },
                        min: {
                            value: 100,
                            message: "Bundle page limit must be greater than 99",
                        },
                    }}
                    render={({ field }) => (
                        <CustomInput
                            type="text"
                            placeholder="E.g. 5"
                            label="Bundle Limit per page"
                            labelPlacement="outside"
                            isInvalid={isValid("bundlePageLimit", errors)}
                            errorMessage={errors.bundlePageLimit?.message || ""}
                            {...field}
                        />
                    )}
                />
                <Controller
                    name="maxBundle"
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: "Please enter Maximum Product per bundle",
                        },
                        max: {
                            value: 9999,
                            message: "Maximum Product per bundle cannot exceed 999999",
                        },
                        min: {
                            value: 100,
                            message: "Maximum Product per bundle must be greater than 99",
                        },
                    }}
                    render={({ field }) => (
                        <CustomInput
                            type="text"
                            placeholder="E.g. 10"
                            label="Maximum Product per bundle"
                            labelPlacement="outside"
                            isInvalid={isValid("salePrice", errors)}
                            errorMessage={errors.maxBundle?.message || ""}
                            {...field}
                        />
                    )}
                />
            </div>
            <Controller
                name="bundleLimit"
                control={control}
                rules={{ required: { value: true, message: "Please enter bundle limit on module" } }}
                render={({ field }) => (
                    <CustomInput
                        type="text"
                        placeholder="E.g. 5"
                        label="Bundle limit on module"
                        labelPlacement="outside"
                        isInvalid={isValid("bundleLimit", errors)}
                        errorMessage={errors.bundleLimit?.message || ""}
                        {...field}
                    />
                )}
            />
        </Container>
    );
};

export default BunldesPageLimit;
