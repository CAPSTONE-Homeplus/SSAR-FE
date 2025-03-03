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
import SidebarSkeleton from "./sidebar-sekeleton";
import { TNavItem } from "@/types/SideBar";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const user = useSelector((state: RootState) => state.user.user);
  const [navItems, setNavItems] = useState<TNavItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case "Admin":
          setNavItems(adminNavItems);
          break;
        case "Manager":
          setNavItems(managerNavItems);
          break;
        default:
          setNavItems([]);
      }
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading || !user) {
    return <SidebarSkeleton />;
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
