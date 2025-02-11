"use client";
import React from "react";
import { useAreas } from "@/hooks/use-areas";
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

export function SelectAreaAsync({
  value,
  onChange,
}: {
  value?: string;
  onChange: (v: string) => void;
}) {
  const { data, isLoading } = useAreas();

  return (
    <Select value={value} onValueChange={onChange} disabled={isLoading}>
      <SelectTrigger>
        <SelectValue placeholder="Chọn khu vực" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {!isLoading
            ? data?.map((area) => (
                <SelectItem key={area.id} value={area.id}>
                  {area.name}
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
