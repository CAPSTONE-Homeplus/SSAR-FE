/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useHouses } from "@/hooks/use-houses";
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

export function SelectHouseAsync({
  value,
  onChange,
  disabled,
}: {
  value?: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {

  const { data, isLoading } = useHouses();

  return (
    <Select value={value} onValueChange={onChange} disabled={disabled || isLoading}>
      <SelectTrigger>
        <SelectValue placeholder="Chọn căn hộ" />
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
                  Phòng {item.numberOfRoom}
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
