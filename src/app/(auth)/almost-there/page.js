"use client";
import { useState } from "react";
import { Divider } from "@nextui-org/react";
import Link from "next/link";
import CardComponent from "@/components/commonComponents/Card/CardComponent";
import CustomButton from "@/components/commonComponents/Button/Button";
import { EmailConfirmation } from "@/components/icons/EmailConfirmation";

const AlmostThere = () => {
  return (
    <div className="z-10 flex min-h-lvh flex-grow text-white-1 flex-col items-center justify-center">
      <CardComponent>
        <section className="mx-auto w-[30vw] max-w-[40vw] min-w-[420px] p-8 min-w-[420px]">
          <div className="flex flex-col justify-center items-center pb-8">
            <EmailConfirmation className="text-2xl text-default-400 pointer-events-none" />
            <h1 className="text-3xl font-bold leading-11 text-center">
              Almost There!
            </h1>
            <label className="text-sm text-gray-2 pt-2 leading-11 text-center">
            Check your email inbox and confirm your account
            </label>
          </div>

          <Divider className="mt-6" />
          <h1 className="text-sm pt-7 leading-11 text-center">
            <div className="text-gray-2">Didn&apos;t  receive any email?</div>
            <Link className="flex flex-col gap-6 pt-6" href={"/signin"}>
              <CustomButton className="py-2 px-6 border border-gray-light rounded-lg bg-white text-blue-3 ">
                Resend Confirmation
              </CustomButton>
            </Link>
          </h1>
        </section>
      </CardComponent>
    </div>
  );
};

export default AlmostThere;
