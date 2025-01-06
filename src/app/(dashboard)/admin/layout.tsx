import { AppSidebar } from "@/components/app-sidebar";
import HeaderMain from "@/components/header-main";
import { SidebarInset } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppSidebar variant="floating" collapsible="icon" />
      <SidebarInset>
        <HeaderMain className="sticky top-0 z-50 w-full" />
        {children}
      </SidebarInset>
    </>
  );
}
