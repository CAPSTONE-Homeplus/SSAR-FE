"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Options } from "nuqs";
import { useTransition } from "react";

interface DataTableSelectProps {
  selectKey: string;
  selectValue: string;
  setSelectValue: (
    value: string | ((old: string) => string | null) | null,
    options?: Options | undefined
  ) => Promise<URLSearchParams>;
  setPage: (
    value: number | ((old: number) => number | null) | null,
    options?: Options | undefined
  ) => Promise<URLSearchParams>;
  options: {
    label: string;
    value: string;
  }[];
  placeholder?: string;
  className?: string;
}

export function DataTableSelect({
  selectKey,
  selectValue,
  setSelectValue,
  setPage,
  options,
  placeholder,
  className,
}: DataTableSelectProps) {
  const [isLoading, startTransition] = useTransition();

  const handleSelect = (value: string) => {
    setSelectValue(value, { startTransition });
    setPage(1); // Reset page to 1 when selection changes
  };

  return (
    <Select value={selectValue ?? ""} onValueChange={handleSelect}>
      <SelectTrigger
        className={cn(
          "w-full md:max-w-sm",
          isLoading && "animate-pulse",
          className
        )}
      >
        <SelectValue placeholder={placeholder ?? `Select ${selectKey}...`} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
