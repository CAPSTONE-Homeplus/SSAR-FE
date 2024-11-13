"use client";

import React, { useCallback, useMemo } from "react";
import { Table } from "@tanstack/react-table";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useUrlParamChange } from "@/hooks/use-url";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { CustomColumnDef, Option } from "@/types/Colunm";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { updateUrlParams, deleteUrlParam, getCurrentParams } =
    useUrlParamChange();

  // Handle search/filter
  const handleSearch = useCallback(
    (column: string, value: string) => {
      const params = getCurrentParams();

      // Cập nhật search param
      if (value) {
        updateUrlParams(`filter.${column}`, value);
      } else {
        deleteUrlParam(`filter.${column}`);
      }

      // Giữ nguyên các param khác
      const currentSort = params.get("sort");
      const currentOrder = params.get("order");
      if (currentSort && currentOrder) {
        updateUrlParams("sort", currentSort);
        updateUrlParams("order", currentOrder);
      }
    },
    [updateUrlParams, deleteUrlParam, getCurrentParams]
  );

  // Reset filters
  const resetFilters = useCallback(() => {
    table.resetColumnFilters();

    // Xóa tất cả filter params nhưng giữ lại các param khác
    const params = getCurrentParams();
    Array.from(params.entries())
      .filter(([key]) => key.startsWith("filter."))
      .forEach(([key]) => deleteUrlParam(key));

    // Giữ lại sorting và pagination nếu có
    const currentSort = params.get("sort");
    const currentOrder = params.get("order");
    const currentPage = params.get("page");
    const currentLimit = params.get("limit");

    if (currentSort && currentOrder) {
      updateUrlParams("sort", currentSort);
      updateUrlParams("order", currentOrder);
    }
    if (currentPage) updateUrlParams("page", currentPage);
    if (currentLimit) updateUrlParams("limit", currentLimit);
  }, [table, deleteUrlParam, getCurrentParams, updateUrlParams]);

  // Get column titles
  const columnTitles = useMemo(() => {
    return table.getAllColumns().reduce((acc, column) => {
      const header = column.columnDef.header;
      if (typeof header === "function") {
        const renderedHeader = header({ column } as any);
        acc[column.id] = React.isValidElement(renderedHeader)
          ? (renderedHeader.props as { title?: string }).title || "ERROR"
          : "ERROR";
      } else {
        acc[column.id] = header?.toString() || "ERROR";
      }
      return acc;
    }, {} as Record<string, string>);
  }, [table]);

  // Get filterable columns
  const filterableColumns = useMemo(() => {
    return table.getAllColumns().filter((column) => {
      const columnDef = column.columnDef as CustomColumnDef<TData, unknown>;
      return columnDef.enableColumnFilter === true;
    });
  }, [table]);

  // Render filter components
  const renderFilterComponent = useCallback(
    (column: any) => {
      const columnDef = column.columnDef as CustomColumnDef<TData, unknown>;
      const filterType = columnDef.meta?.filterType || "input";

      if (filterType === "input") {
        return (
          <Input
            key={column.id}
            placeholder={
              columnDef.meta?.placeholder ||
              `Search ${columnTitles[column.id]}...`
            }
            value={(column.getFilterValue() as string) ?? ""}
            onChange={(event) => {
              column.setFilterValue(event.target.value);
              handleSearch(column.id, event.target.value);
            }}
            className="h-8 w-full"
          />
        );
      }

      if (filterType === "select" && columnDef.meta?.options) {
        return (
          <DataTableFacetedFilter
            key={column.id}
            column={column}
            title={columnTitles[column.id]}
            options={columnDef.meta.options as Option[]}
            onSelect={(value) => {
              column.setFilterValue(value);
              if (value.length > 0) {
                updateUrlParams(`filter.${column.id}`, value.join(","));
              } else {
                deleteUrlParam(`filter.${column.id}`);
              }
            }}
          />
        );
      }

      return null;
    },
    [columnTitles, handleSearch, updateUrlParams, deleteUrlParam]
  );

  const hasActiveFilters = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search Input - Always visible */}
        <div className="flex-1 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search all columns..."
              value={
                (table.getColumn("search")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("search")?.setFilterValue(event.target.value)
              }
              className="pl-8 w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Filter Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="sm:hidden"
                disabled={filterableColumns.length === 0}
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                {filterableColumns.map((column) => (
                  <div key={column.id} className="grid gap-2">
                    <label className="text-sm font-medium">
                      {columnTitles[column.id]}
                    </label>
                    {renderFilterComponent(column)}
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop Filters */}
          <div className="hidden sm:flex items-center gap-2">
            {filterableColumns.map((column) => renderFilterComponent(column))}
          </div>

          {/* View Options */}
          <DataTableViewOptions table={table} />

          {/* Reset Filters */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={resetFilters}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
