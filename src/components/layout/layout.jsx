import { useDispatch, useSelector } from "react-redux";
import { setCollapsed } from "@/redux/slice";
import { usePathname } from "next/navigation";
import { useLockedBody } from "@/components/hooks/useBodyLock";
import { NavbarWrapper } from "@/components/navbar/navbar";
import { SidebarWrapper } from "@/components/sidebar/sidebar";
import AuthLayout from "./auth-layout";

export const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state) => state.collapsed);
  const [_, setLocked] = useLockedBody(false);
  const pathname = usePathname();

  const isAuthRoute = () => {
    const authRoutes = [
      "/signin",
      "/signup",
      "/forgot-password",
      "/confirm-email",
      "/almost-there",
    ];
    return authRoutes.includes(pathname);
  };

  // Handle sidebar toggle
  const handleToggleSidebar = () => {
    dispatch(setCollapsed(!sidebarOpen));
    setLocked(!sidebarOpen);
  };

  return (
    <section className="flex">
      {isAuthRoute() ? (
        <AuthLayout>{children}</AuthLayout>
      ) : (
        <>
          <SidebarWrapper handleSidebar={handleToggleSidebar} />
          <NavbarWrapper>{children}</NavbarWrapper>
        </>
      )}
    </section>
  );
};

// export default Layout;
