import { capitalize } from "@/utils/common-utils";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Navbar,
  NavbarContent,
} from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BurguerButton } from "./burguer-button";
import { UserDropdown } from "./user-dropdown";

export const NavbarWrapper = ({ children }) => {
  const pathname = usePathname();
  const pageTitle = capitalize(pathname?.split("/")[1]);

  //need to optmize this breadcrumb function and make it global component
  const getBreadcrumbItems = () => {
    if (pathname === "/") {
      return [
        <BreadcrumbItem key="/" isActive>
          Dashboard
        </BreadcrumbItem>,
      ];
    }

    const segments = pathname.split("/").filter(Boolean);
    return segments.map((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/");
      const isLast = index === segments.length - 1;
      const decodedSegment = decodeURIComponent(segment);
      return (
        <BreadcrumbItem key={href} isActive={isLast}>
          {isLast ? (
            decodedSegment.charAt(0).toUpperCase() + decodedSegment.slice(1)
          ) : (
            <Link href={href}>
              {decodedSegment.charAt(0).toUpperCase() + decodedSegment.slice(1)}
            </Link>
          )}
        </BreadcrumbItem>
      );
    });
  };

  return (
    <div className="relative flex flex-col flex-1  bg-mainContainer">
      <div className=" sticky top-0 z-[40]">
        <Navbar
          className="bg-mainContainer w-full justify-center"
          classNames={{
            wrapper: "w-full max-w-full",
          }}
        >
          <NavbarContent className="md:hidden">
            <BurguerButton />
          </NavbarContent>
          <NavbarContent className="flex-col items-start gap-0 justify-center">
            {/* <h3 className=" text-[24px] font-bold">{pageTitle}</h3> */}
            <Breadcrumbs radius="lg" variant="" className="py-5">
              {getBreadcrumbItems()}
            </Breadcrumbs>
          </NavbarContent>
          <NavbarContent
            justify="center"
            className=" data-[justify=end]:flex-grow-1"
          >
            <div className="font-semibold text-sm">Airport Appliances</div>
            {/* <NotificationsDropdown /> */}
            <UserDropdown />
          </NavbarContent>
        </Navbar>
      </div>
      {children}
    </div>
  );
};
