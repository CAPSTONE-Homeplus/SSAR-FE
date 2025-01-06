import React from "react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/mode-toggle";
import { DynamicBreadcrumb } from "./dynamic-breadcumbs";
interface HeaderMainProps {
  className?: string;
}

const HeaderMain = ({ className }: HeaderMainProps) => {
  return (
    <header
      className={`flex h-16 shrink-0 items-center gap-2 border-b px-4 ${
        className || ""
      }`}
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <DynamicBreadcrumb className="flex items-center gap-2" />
      </div>
      <ModeToggle className="ml-auto" />
    </header>
  );
};

export default HeaderMain;
