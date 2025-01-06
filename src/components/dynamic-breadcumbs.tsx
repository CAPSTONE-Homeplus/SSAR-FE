"use client";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { cn } from "@/lib/utils";

// Định nghĩa interface cho breadcrumb item
interface BreadcrumbItem {
  label: string;
  href: string;
  hidden?: boolean;
}

// Map các segment với label tương ứng
const segmentLabels: Record<string, string> = {
  areas: "Areas",
  clusters: "Clusters",
  buildings: "Buildings",
};

// Hàm để capitalize chữ cái đầu và bỏ dấu gạch ngang
const formatSegment = (segment: string): string => {
  const withoutDash = segment.replace(/-/g, " ");
  return withoutDash.charAt(0).toUpperCase() + withoutDash.slice(1);
};

type BreadcrumbProps = {
  className?: string;
};
export function DynamicBreadcrumb({ className }: BreadcrumbProps) {
  const pathname = usePathname();

  // Tạo mảng breadcrumb items
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

    let path = "";
    segments.forEach((segment, index) => {
      path += `/${segment}`;

      // Kiểm tra nếu segment là ID (có thể customize logic này)
      const isId = /^\[.*\]$/.test(segment) || /^\d+$/.test(segment);

      if (!isId) {
        const label = segmentLabels[segment] || formatSegment(segment);
        // Ẩn các item ở giữa nếu có quá nhiều segments
        const hidden =
          segments.length > 4 && index > 0 && index < segments.length - 2;

        breadcrumbs.push({
          label,
          href: path,
          hidden,
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();
  const hiddenItems = breadcrumbs.filter((item) => item.hidden);
  const visibleItems = breadcrumbs.filter((item) => !item.hidden);

  return (
    <Breadcrumb className={cn("grid gap-2", className)}>
      <BreadcrumbList>
        {visibleItems.map((item, index) => (
          <React.Fragment key={item.href}>
            <BreadcrumbItem>
              {index === visibleItems.length - 1 ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>

            {/* Show dropdown if there are hidden items */}
            {index === 0 && hiddenItems.length > 0 && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      <BreadcrumbEllipsis className="h-4 w-4" />
                      <span className="sr-only">Show hidden breadcrumbs</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {hiddenItems.map((item) => (
                        <DropdownMenuItem key={item.href}>
                          <BreadcrumbLink href={item.href}>
                            {item.label}
                          </BreadcrumbLink>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </BreadcrumbItem>
              </>
            )}

            {index < visibleItems.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
