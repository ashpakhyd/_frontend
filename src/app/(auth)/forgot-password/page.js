"use client";
import { useState } from "react";
import { Input, Divider } from "@nextui-org/react";
import { EyeOpenFilledIcon } from "@/components/icons/EyeOpenFilledIcon";
import { EyeCloseFilledIcon } from "@/components/icons/EyeCloseFilledIcon";
import Link from "next/link";
import CardComponent from "@/components/commonComponents/Card/CardComponent";
import CustomButton from "@/components/commonComponents/Button/Button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Here you can perform any validation or processing before submitting the form
    console.log("Submitted");
  };

  return (
    <div className="z-10 text-white-1 flex min-h-lvh flex-grow flex-col items-center justify-center">
      <CardComponent>
        <section className="mx-auto w-[30vw] max-w-[40vw] min-w-[420px] p-8">
          <div className="flex flex-col justify-center items-center pb-8">
            <h1 className="text-3xl font-bold leading-11 text-center">
              Password Reset
            </h1>
            <label className="text-sm text-gray-2 pt-2 leading-11 text-center">
                We Will Help You Reset Your Password
            </label>
          </div>

          <form
            noValidate
            className="flex flex-col gap-6"
            onSubmit={handleSubmit}
          >
            <div className="group flex flex-col w-full">
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                isClearable
                onClear={() => setEmail("")}
                variant="bordered"
                radius="sm"
                // description="We'll never share your email with anyone else."
                isRequired
                // isInvalid={true}
                // color="danger"
                placeholder="Enter Email Address"
                labelPlacement={"outside"}
              />
            </div>
            <CustomButton type="submit" className="py-2 px-4 border-none rounded-lg bg-primaryBtn text-white">Reset Password</CustomButton>
          </form>
          <Divider className="mt-8" />
          <h1 className="text-sm pt-5 leading-11 text-center">
            <div className="text-gray-2">Remembered your password?</div>
            <Link className="flex flex-col gap-6 pt-4" href={"/signin"}>
              <CustomButton btnColor="white" textColor="black">
                Back to Sign In
              </CustomButton>
            </Link>
          </h1>
        </section>
      </CardComponent>
    </div>
  );
};

export default ForgotPassword;
