// "use client";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";

export default function CustomTabs({ tabData }) {
  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        classNames={{
          tabContent: [
            "rounded-md bg-white",
            "data-[hover=true]:bg-white",
            "group-data-[selected=true]:text-blue-2",
            "text-gray-2",
            "bg-white",
            "text-base",
          ],
          tabList: [" bg-white", "p-0", "rounded-none", "gap-12"],
          base: ["border-b ", "border-gray-3"],
          tab: [
            "pb-3 rounded-none px-0",
            "data-[selected=true]:text-blue-2",
            "data-[selected=true]:border-b-2",
            "data-[selected=true]:border-blue-2",
          ],
          cursor: [
            "rounded-none shadow-none",
            "data-[focus-visible=true]:outline-none	",
          ],
          panel: ["p-0"],
        }}
      >
        {tabData.map((data) => {
          return (
            <Tab key={data.key} title={data.title}>
              <Card className=" rounded-none border-none shadow-none">
                <CardBody className="p-0">{data.element}</CardBody>
              </Card>
            </Tab>
          );
        })}
      </Tabs>
    </div>
  );
}
