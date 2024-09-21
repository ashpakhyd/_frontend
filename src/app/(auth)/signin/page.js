"use client";
import { useState } from "react";
import { Input, Checkbox } from "@nextui-org/react";
import { EyeOpenFilledIcon } from "@/components/icons/EyeOpenFilledIcon";
import { EyeCloseFilledIcon } from "@/components/icons/EyeCloseFilledIcon";
import Link from "next/link";
import CardComponent from "@/components/commonComponents/Card/CardComponent";
import CustomButton from "@/components/commonComponents/Button/Button";
import { Controller, useForm } from "react-hook-form";

const SignIn = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
  };

  return (
    <div className="z-10 flex min-h-lvh flex-grow text-white-1 flex-col items-center justify-center">
      <CardComponent>
        <section className="mx-auto w-[30vw] max-w-[40vw] min-w-[420px] p-8">
          <div className="flex flex-col justify-center items-center pb-8">
            <h1 className="text-3xl font-bold leading-11 text-center">
              Sign In
            </h1>
            <h1 className="text-md pt-2 leading-11 text-center">
              <span className="text-gray-2">New to Our Product?</span>{" "}
              <Link className="font-normal text-blue-3" href={"/signup"}>
                Create an Account
              </Link>
            </h1>
          </div>

          <form
            noValidate
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="group flex flex-col w-full">
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Enter a valid email address",
                  },
                }}
                render={({ field }) => (
                  <Input
                    label="Email Address"
                    type="email"
                    {...field}
                    isClearable
                    onClear={() => field.onChange("")}
                    variant="bordered"
                    radius="sm"
                    placeholder="Enter Email Address"
                    labelPlacement={"outside"}
                    labelClassName="text-gray-2"
                    isRequired
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                  />
                )}
              />
            </div>
            <div className="group flex flex-col w-full">
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must contain uppercase, lowercase, number, and special character",
                  },
                }}
                render={({ field }) => (
                  <Input
                    label="Password"
                    placeholder="Enter password"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeCloseFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeOpenFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                    {...field}
                    variant="bordered"
                    radius="sm"
                    isRequired
                    labelPlacement={"outside"}
                    isInvalid={!!errors.password}
                    errorMessage={errors.password?.message}
                  />
                )}
              />
            </div>
            <Controller
              name="keepSignedIn"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Checkbox
                  {...field}
                  isSelected={field.value}
                  onChange={(value) => field.onChange(value)}
                  color="default"
                >
                  Keep me signed in
                </Checkbox>
              )}
            />
            <CustomButton
              type="submit"
              className="py-2 px-4 border-none rounded-lg bg-primaryBtn text-white"
            >
              Sign In
            </CustomButton>
          </form>
          <h1 className="text-sm pt-5 leading-11 text-center">
            <Link href={"/forgot-password"} className="text-blue-3">
              Forgot your password?
            </Link>
          </h1>
        </section>
      </CardComponent>
    </div>
  );
};

export default SignIn;
