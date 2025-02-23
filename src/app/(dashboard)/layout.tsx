import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import HeaderMain from "@/components/header-main";
import { SidebarInset } from "@/components/ui/sidebar";
const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <AppSidebar variant="floating" collapsible="icon" />
      <SidebarInset>
        <HeaderMain className="sticky top-0 z-auto w-full" />
        {children}
      </SidebarInset>
    </>
  );
};

export default DashboardLayout;
