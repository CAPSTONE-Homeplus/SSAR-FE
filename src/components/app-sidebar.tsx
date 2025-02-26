"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import { RootState } from "@/redux/store";
import {
  adminNavItems,
  managerNavItems,
  data,
} from "@/constants/sidebar/route";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton UI

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const user = useSelector((state: RootState) => state.user.user);
  const [isLoading, setIsLoading] = useState(true);

  // 🔹 Khi Redux cập nhật `user`, tắt trạng thái loading
  useEffect(() => {
    if (user !== null) {
      setIsLoading(false);
    }
  }, [user]);

  // ✅ Hiển thị Skeleton nếu đang loading
  if (isLoading) {
    return (
      <div className="w-64 h-screen p-4">
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-6 w-1/2 mb-2" />
        <Skeleton className="h-6 w-2/3 mb-2" />
        <Skeleton className="h-10 w-full mt-4" />
      </div>
    );
  }

  // ✅ Chọn navigation items theo role
  const getNavItemsByRole = () => {
    switch (user?.role) {
      case "Admin":
        return adminNavItems;
      case "Manager":
        return managerNavItems;
      default:
        return [];
    }
  };

  return (
    <Sidebar {...props} className="w-auto">
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={getNavItemsByRole()} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
