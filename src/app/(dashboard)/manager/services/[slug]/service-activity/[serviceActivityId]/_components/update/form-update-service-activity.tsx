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
import { useRouter } from "next/navigation";
import { updateServiceActivity } from "@/apis/service-activity";
import {
  ServiceActivitySchema,
  TServiceActivityUpdateRequest,
} from "@/schema/service-activity.schema";

type Props = {
  initialData: TServiceActivityUpdateRequest;
};

export function FormUpdateServiceActivityInService({ initialData }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<TServiceActivityUpdateRequest>({
    resolver: zodResolver(ServiceActivitySchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: TServiceActivityUpdateRequest) => {
    try {
      const response = await updateServiceActivity(initialData.id, data);
      if (response.status === 200) {
        toast({
          title: "Cập nhập thành công",
          description: "Đã cập nhật thành công.",
        });
      } else {
        toast({
          title: "Lỗi",
          description: "Không thể cập nhật",
          variant: "destructive",
        });
      }
      router.refresh();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: `Có lỗi xảy ra khi cập nhật ${error.message}`,
        variant: "destructive",
      });
    }
  };
  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 py-0 px-4 md:px-0 md:py-4">
          {/* Tên */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="name">Tên</Label>
                <FormControl>
                  <Input
                    placeholder="Nhập tên..."
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Mã Code */}
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="code">Mã Code</Label>
                <FormControl>
                  <Input
                    placeholder="Nhập mã code..."
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Trạng thái */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="status">Trạng Thái</Label>
                <FormControl>
                  <Input
                    placeholder="Nhập trạng thái..."
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Ngày tạo */}
          <FormField
            control={form.control}
            name="createdAt"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="createdAt">Ngày Tạo</Label>
                <FormControl>
                  <Input type="datetime-local" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Ngày cập nhật */}
          <FormField
            control={form.control}
            name="updatedAt"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="updatedAt">Ngày Cập Nhật</Label>
                <FormControl>
                  <Input type="datetime-local" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Mức độ ưu tiên */}
          <FormField
            control={form.control}
            name="prorityLevel"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="prorityLevel">Mức Độ Ưu Tiên</Label>
                <FormControl>
                  <Input type="number" {...field} disabled={isSubmitting} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Thời gian ước tính */}
          <FormField
            control={form.control}
            name="estimatedTimePerTask"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="estimatedTimePerTask">Thời Gian Ước Tính</Label>
                <FormControl>
                  <Input
                    placeholder="Nhập thời gian ước tính..."
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Biện pháp an toàn */}
          <FormField
            control={form.control}
            name="safetyMeasures"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="safetyMeasures">Biện Pháp An Toàn</Label>
                <FormControl>
                  <Input
                    placeholder="Nhập biện pháp an toàn..."
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="serviceId"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="serviceId">ID Dịch Vụ</Label>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Đang cập nhật..." : "Cập nhật"}
        </Button>
      </form>
    </Form>
  );
}
