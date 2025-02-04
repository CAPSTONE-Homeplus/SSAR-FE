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
        {isLoading ? (
          <Skeleton className="w-full h-8 rounded-md" />
        ) : (
          <SelectValue placeholder="Chọn khu vực" />
        )}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data?.map((area) => (
            <SelectItem key={area.id} value={area.id}>
              {area.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
