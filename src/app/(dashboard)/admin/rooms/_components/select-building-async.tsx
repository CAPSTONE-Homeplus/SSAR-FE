"use client";
import React from "react";
import { useBuildings } from "@/hooks/use-buildings";
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

export function SelectBuildingAsync({
  value,
  onChange,
}: {
  value?: string;
  onChange: (v: string) => void;
}) {
  const { data, isLoading } = useBuildings();

  return (
    <Select value={value} onValueChange={onChange} disabled={isLoading}>
      <SelectTrigger>
        <SelectValue placeholder="Chọn tòa" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {!isLoading
            ? data?.map((item) => (
                <SelectItem
                  key={item.id}
                  value={item.id}
                  className="hover:bg-accent"
                >
                  {item.name}
                </SelectItem>
              ))
            : Array.from({ length: 5 }).map((_, index) => (
                <SelectItem key={index} value={index.toString()} disabled>
                  <Skeleton className="h-4 w-full" />
                </SelectItem>
              ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
