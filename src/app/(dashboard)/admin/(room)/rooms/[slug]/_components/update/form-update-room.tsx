/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RoomCreateSchema, TRoomRequest } from "@/schema/room.schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updateRoom } from "@/apis/room";
import { Switch } from "@/components/ui/switch";
import { SelectHouseAsync } from "../../../_components/select-house-async";
import { SelectRoomTypeAsync } from "../../../_components/select-room-type-async";
type Props = {
  initialData: TRoomRequest;
};
export function FormUpdateRoom({ initialData }: Props) {
  const { toast } = useToast();

  const form = useForm<TRoomRequest>({
    resolver: zodResolver(RoomCreateSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: TRoomRequest) => {
    try {
      const response = await updateRoom(initialData.id, data);
      if (response.status === 200) {
        toast({
          title: "Cập nhập thành công",
          description: "Phòng đã được cập nhập thành công.",
        });
      } else {
        toast({
          title: "Lỗi",
          description: "Không thể tạo phòng",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: `Có lỗi xảy ra khi tạo phòng: ${error.message}`,
        variant: "destructive",
      });
    }
  };
  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-6 gap-4 py-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <Label htmlFor="name">Tên phòng</Label>
                <FormControl>
                  <Input
                    placeholder="Nhập tên phòng..."
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <Label htmlFor="code">Mã phòng</Label>
                <FormControl>
                  <Input
                    placeholder="Nhập mã phòng..."
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <Label htmlFor="size">Kích thước phòng</Label>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập kích thước phòng..."
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="squareMeters"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <Label htmlFor="squareMeters">Diện tích (m²)</Label>
                <FormControl>
                  <Input
                    placeholder="Nhập diện tích phòng..."
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="houseId"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <Label htmlFor="houseId">Chọn căn hộ</Label>
                <FormControl>
                  <SelectHouseAsync
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="roomTypeId"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <Label htmlFor="roomTypeId">Loại phòng</Label>
                <SelectRoomTypeAsync
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isSubmitting}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="furnitureIncluded"
            render={({ field }) => (
              <FormItem className="col-span-2 flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Có bao gồm nội thất</FormLabel>
                  <FormDescription>Chọn nếu nhà có nội thất</FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto"
        >
          {isSubmitting ? "Đang cập nhật..." : "Cập nhật"}
        </Button>
      </form>
    </Form>
  );
}
