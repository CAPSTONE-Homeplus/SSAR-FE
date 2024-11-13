"use client";

import * as React from "react";
import { Column } from "@tanstack/react-table";
import { Check, Filter, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Option } from "@/types/Colunm";

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: Option[];
  searchPlaceholder?: string;
  multiple?: boolean;
  className?: string;
  onSelect?: (value: string[]) => void;
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
  searchPlaceholder,
  multiple = true,
  className,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);
  const [open, setOpen] = React.useState(false);

  // Handle selection
  const handleSelect = React.useCallback(
    (value: string) => {
      if (!column) return;

      let newValues: string[] = [];

      if (multiple) {
        if (selectedValues.has(value)) {
          selectedValues.delete(value);
        } else {
          selectedValues.add(value);
        }
        newValues = Array.from(selectedValues);
      } else {
        newValues = [value];
        setOpen(false);
      }

      column.setFilterValue(newValues.length ? newValues : undefined);
    },
    [column, multiple, selectedValues]
  );

  // Clear filters
  const handleClear = React.useCallback(() => {
    column?.setFilterValue(undefined);
    setOpen(false);
  }, [column]);

  // Get selected options for display
  const selectedOptions = React.useMemo(
    () => options.filter((option) => selectedValues.has(option.value)),
    [options, selectedValues]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-8 border-dashed",
            selectedValues.size > 0 && "border-primary",
            className
          )}
        >
          <Filter className="mr-2 h-4 w-4" />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  selectedOptions.map((option) => (
                    <Badge
                      variant="secondary"
                      key={option.value}
                      className="rounded-sm px-1 font-normal"
                    >
                      {option.label}
                    </Badge>
                  ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[200px] p-0"
        align="start"
        side="bottom"
        sideOffset={8}
      >
        <Command>
          <CommandInput
            placeholder={searchPlaceholder || `Search ${title}...`}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    disabled={option.disabled}
                    onSelect={() => handleSelect(option.value)}
                    className={cn(
                      "flex items-center gap-2",
                      option.disabled && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-4 w-4 items-center justify-center rounded-sm border",
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted"
                      )}
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                    </div>
                    {option.icon && (
                      <option.icon className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                    {option.description && (
                      <span className="text-xs text-muted-foreground">
                        {option.description}
                      </span>
                    )}
                    {facets?.get(option.value) && (
                      <Badge
                        variant="secondary"
                        className="ml-auto h-4 w-4 font-mono text-xs"
                      >
                        {facets.get(option.value)}
                      </Badge>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={handleClear}
                    className="justify-center text-center text-muted-foreground"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
