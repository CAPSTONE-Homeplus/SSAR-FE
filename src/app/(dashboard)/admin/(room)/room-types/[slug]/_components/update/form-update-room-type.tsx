"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { updateRoomType } from "@/apis/room-type";
import { useRouter } from "next/navigation";
import {
  RoomTypeSchema,
  TUpdateRoomTypeRequest,
} from "@/schema/room-type.schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { statusOptions } from "@/constants/config";

type Props = {
  initialData: TUpdateRoomTypeRequest;
};

export function FormUpdateRoomType({ initialData }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<TUpdateRoomTypeRequest>({
    resolver: zodResolver(RoomTypeSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: TUpdateRoomTypeRequest) => {
    try {
      const response = await updateRoomType(initialData.id, data);
      if (response.status === 200) {
        toast({
          title: "Cập nhật nhà thành công",
          description: "Thông tin nhà đã được cập nhật thành công.",
        });
      } else {
        toast({
          title: "Lỗi",
          description: "Không thể cập nhật thông tin nhà",
          variant: "destructive",
        });
      }
      router.refresh();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: `Có lỗi xảy ra khi cập nhật thông tin nhà: ${error.message}`,
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
              <FormItem className="col-span-3">
                <label className="text-sm font-medium">Tên loại phòng</label>
                <FormControl>
                  <Input
                    placeholder="Nhập tên loại phòng..."
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
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <label className="text-sm font-medium">Mô tả</label>
                <FormControl>
                  <Input
                    placeholder="Nhập mô tả loại phòng..."
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
              <FormItem className="col-span-3">
                <label className="text-sm font-medium">Mã Loại Phòng</label>
                <FormControl>
                  <Input
                    placeholder="Nhập mã loại phòng..."
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
            name="status"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="status">Trạng thái</Label>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statusOptions.map((option, index) => (
                        <SelectItem key={index} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
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
