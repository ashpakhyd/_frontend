import React, { useState } from "react";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { setCollapsed } from "@/redux/slice";
import Link from "next/link";
import { CollapseItems } from "./collapse-items";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { ChevronUpIcon } from "../icons/ChevronUpIcon";
import { cn } from "@/utils/common-utils";
import { usePathname, useRouter } from "next/navigation";

export const SidebarItem = ({
  icon,
  title,
  href = "",
  path,
  query,
  children,
  isDropdown,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const activeColor = "text-gray-6";
  const inactiveColor = "text-black-1";

  const isActiveLink = (path) => {
    if (pathname.startsWith(path) && path.length === pathname.length) {
      return true;
    }
  };

  const generateHref = (path, query) => {
    const queryString = new URLSearchParams(query).toString();
    return `${path}?${queryString}`;
  };

  const handleDropdownUrl = (path, query) => {
    if (isActiveLink(path)) {
      return;
    } else {
      router.push(path);
    }
  };

  return (
      <div className="gap-4 h-full items-center cursor-pointer">
        {!isDropdown && (
          <Link
            href={generateHref(path, query)}
            className={cn("text-black cursor-pointer")}
          >
            <div
              className={cn(
                "flex gap-2 w-full min-h-[40px] h-full items-center px-3.5 rounded-xl transition-all duration-150 active:scale-[0.98]",
                {
                  "bg-white text-black [&_svg_path]:fill-black":
                    isActiveLink(path),
                  "hover:bg-white": !isActiveLink(path),
                }
              )}
            >
              {icon}
              <div
                className={cn(
                  "text-sm font-semibold bg-red-500",
                  isActiveLink(path) ? activeColor : inactiveColor
                )}
              >
                {title}
              </div>
            </div>
          </Link>
        )}
        {isDropdown && (
          <Accordion className="">
            <AccordionItem
              indicator={<ChevronUpIcon />}
              classNames={{
                indicator: "data-[open=true]:-rotate-180",
                trigger:
                  "py-0 min-h-[40px] hover:bg-white rounded-xl active:scale-[0.98] transition-transform px-1",
                content: "py-0",
                title:
                  "px-0 flex text-base  h-full items-center cursor-pointer",
              }}
              aria-label="Accordion 1"
              title={
                <div
                  className="flex flex-row gap-2 text-sm font-semibold"
                  onClick={() => handleDropdownUrl(path)}
                >
                  <span>{icon}</span>
                  <span>{title}</span>
                </div>
              }
            >
              <div className="pt-2 pl-8">
                {children?.map((item, index) => {
                  return (
                    <Link
                      href={generateHref(item?.path, item?.query)}
                      key={index}
                      className="text-xs w-full flex py-1 pt-0  text-default-500 hover:text-default-900 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 self-center bg-black-1 rounded-full  mr-2"></span>
                      <p
                        className={cn(
                          isActiveLink(item?.path) ? activeColor : inactiveColor
                        )}
                      >
                        {item?.title}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </AccordionItem>
          </Accordion>
        )}
      </div>
  );
};
