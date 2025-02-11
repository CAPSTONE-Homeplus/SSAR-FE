"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AreaResponseSchema, TUpdateAreaRequest } from "@/schema/area.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { updateArea } from "@/apis/area";
import { useRouter } from "next/navigation";

type Props = {
  initialData: TUpdateAreaRequest;
};

export function FormUpdateArea({ initialData }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<TUpdateAreaRequest>({
    resolver: zodResolver(AreaResponseSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: TUpdateAreaRequest) => {
    try {
      const response = await updateArea(initialData.id, data);
      if (response.status === 200) {
        toast({
          title: "Cập nhập thành công",
          description: "Đã cập nhật thành công.",
        });
      } else {
        toast({
          title: "Lỗi",
          description: "Không thể cập nhật khu vực",
          variant: "destructive",
        });
      }
      router.refresh();
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: `Có lỗi xảy ra khi cập nhật khu vực ${error.message}`,
        variant: "destructive",
      });
    }
  };
  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 py-0 px-4 md:px-0 md:py-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="name">Tên Khu Vực</Label>
                <FormControl>
                  <Input
                    placeholder="Nhập tên khu vực..."
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
              <FormItem>
                <Label htmlFor="code">Mã Khu Vực</Label>
                <FormControl>
                  <Input
                    placeholder="Nhập mã khu vực..."
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
            name="contactInfo"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="contactInfo">Thông Tin Liên Hệ</Label>
                <FormControl>
                  <Input
                    placeholder="Nhập thông tin liên hệ..."
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
            name="areaType"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="areaType">Loại Khu Vực</Label>
                <FormControl>
                  <Input
                    placeholder="Nhập loại khu vực..."
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
            name="address"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <Label htmlFor="address">Địa Chỉ</Label>
                <FormControl>
                  <Input
                    placeholder="Nhập địa chỉ..."
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
              <FormItem className="col-span-2">
                <Label htmlFor="description">Mô Tả</Label>
                <FormControl>
                  <Textarea
                    placeholder="Nhập mô tả khu vực..."
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Đang cập nhập..." : "Cập nhập"}
        </Button>
      </form>
    </Form>
  );
}
