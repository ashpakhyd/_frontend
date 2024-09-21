import { Accordion, AccordionItem } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { ChevronUpIcon } from "../icons/ChevronUpIcon";

export const CollapseItems = ({ icon, items, title }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex gap-4 h-full items-center cursor-pointer">
      <Accordion className="px-0">
        <AccordionItem
          indicator={<ChevronUpIcon />}
          classNames={{
            indicator: "data-[open=true]:-rotate-180",
            trigger:
              "py-0 min-h-[44px] hover:bg-default-100 rounded-xl active:scale-[0.98] transition-transform px-3.5",

            title:
              "px-0 flex text-base gap-2 h-full items-center cursor-pointer",
          }}
          aria-label="Accordion 1"
          title={
            <div className="flex flex-row gap-2">
              <span>{icon}</span>
              <span>{title}</span>
            </div>
          }
        >
          <div className="pl-8">
            {items.map((item, index) => (
              <Link
                href={item?.href}
                key={index}
                className="w-full flex p-1  text-default-500 hover:text-default-900 transition-colors"
              >
                <span className="w-2 h-2 self-center bg-black-1 rounded-full  mr-2"></span>
                {item?.name}
              </Link>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
