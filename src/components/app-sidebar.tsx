"use client";

import React, { Suspense } from "react";
import { useSelector } from "react-redux";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  adminNavItems,
  managerNavItems,
  // staffNavItems,
  data,
} from "@/constants/sidebar/route";
import { RootState } from "@/redux/store";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  // Lấy `role` từ Redux store.
  const user = useSelector((state: RootState) => state.user.user);

  // Dữ liệu sidebar theo role.
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
    <Suspense fallback={<div>Loading...</div>}>
      <Sidebar {...props} className="w-auto">
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>
        <SidebarContent>
          {user ? (
            <NavMain items={getNavItemsByRole()} />
          ) : (
            <div>No access to this content</div>
          )}
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
          {/* Dữ liệu giả */}
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </Suspense>
  );
}
