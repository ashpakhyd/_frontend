"use client";
import { useState } from "react";
import { Input, Divider } from "@nextui-org/react";
import Link from "next/link";
import CardComponent from "@/components/commonComponents/Card/CardComponent";
import CustomButton from "@/components/commonComponents/Button/Button";
import { Controller, useForm } from "react-hook-form";

const ConfirmEmail = () => {
  const { handleSubmit, control, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
  };

  return (
    <div className="z-10 flex min-h-lvh flex-grow flex-col items-center justify-center">
      <CardComponent>
        <section className="mx-auto w-[30vw] max-w-[40vw] min-w-[420px] p-8">
          <div className="flex flex-col justify-center items-center py-8">
            <h1 className="text-3xl font-bold leading-11 text-center">
              Confirm Email
            </h1>
            <label className="text-sm text-gray-2 pt-2 leading-11 text-center">
            Check Your Email and Enter Confirmation Code
            </label>
          </div>

          <form
            noValidate
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="group flex flex-col w-full">
              <Controller
                name="code"
                control={control}
                defaultValue=""
                rules={{
                  required: "Confirmation code is required",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Enter a valid 6-digit code",
                  },
                }}
                render={({ field }) => (
                  <Input
                    label="Confirmation Code"
                    type="text"
                    {...field}
                    isClearable
                    onClear={() => field.onChange("")}
                    variant="bordered"
                    radius="sm"
                    placeholder="Enter Code"
                    labelPlacement={"outside"}
                    isRequired
                    isInvalid={!!errors.code}
                    errorMessage={errors.code?.message}
                  />
                )}
              />
            </div>
            <CustomButton type="submit" className="py-2 px-4 border-none rounded-lg bg-primaryBtn text-white">Confirm Email</CustomButton>
          </form>
          <Divider className="mt-8" />
          <h1 className="text-sm pt-5 leading-11 text-center">
            <div className="text-sm text-gray-2">Haven&apos;t received your code?</div>
            <Link className="flex flex-col gap-6 pt-5" href={"/signin"}>
              <CustomButton btnColor="white" className="py-2 px-6 border border-gray-light rounded-lg bg-white text-blue-3 ">
                Resend Code
              </CustomButton>
            </Link>
          </h1>
        </section>
      </CardComponent>
    </div>
  );
};

export default ConfirmEmail;
