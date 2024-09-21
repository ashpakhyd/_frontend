import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { Sidebar } from "./sidebar.styles";
import Logo from "@/public/logo.webp";
import { SidebarRoutes } from "./routes";
import ContentIcon from "../icons/sidebar/Content";
import DynamicImage from "../commonComponents/DynamicImages/DynamicImage";

export const SidebarWrapper = ({ handleSidebar }) => {
  const pathname = usePathname();
  const collapsed = useSelector((state) => state.collapsed);

  const company = {
    logo: (
      <DynamicImage
        src={Logo}
        priority
        alt="Airport Appliances"
        className="rounded-md"
      />
    ),
  };

  return (
    <aside className="h-screen sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={handleSidebar} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <div className="w-full">
            <div className="cursor-pointer">
              <div className="flex items-center gap-2">{company.logo}</div>
            </div>
          </div>{" "}
        </div>
        <div className="flex flex-col justify-between h-full bg-mainContainer">
          <div className={Sidebar.Body()}>
            {SidebarRoutes.map((route) => {
              return (
                <SidebarItem
                  key={route.title}
                  {...route}
                />
              );
            })}
            {/* <SidebarMenu title="Other Information">
              <SidebarItem
                isActive={pathname === "/knowledgebase"}
                title="Knowledge Base"
                // icon={<DevIcon />}
                href={`/knowledgebase?limit=10&page=1`}
              />
              <SidebarItem
                isActive={pathname === "/productupdates"}
                title="Product Updates"
                // icon={<ViewIcon />}
                href={`/productupdates?limit=10&page=1`}
              />
            </SidebarMenu> */}
            <SidebarMenu title="Settings">
              <SidebarItem
                isActive={pathname === "/personalsettings"}
                title="Personal Settings"
                // icon={<ChangeLogIcon />}
                href={`/personalsettings?limit=10&page=1`}
              />
              {/* <SidebarItem
                isActive={pathname === "/globalsettings"}
                title="Global Settings"
                // icon={<ChangeLogIcon />}
                href={`/globalsettings?limit=10&page=1`}
              /> */}
            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};
