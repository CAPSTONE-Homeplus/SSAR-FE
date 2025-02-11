"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TClusterResponse, UpdateClusterSchema } from "@/schema/cluster.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { updateCluster } from "@/apis/cluster";
import { useRouter } from "next/navigation";
import { SelectAreaAsync } from "../../../_components/select-area-async";
import { statusOptions } from "../../../_components/config";

type Props = {
  initialData: TClusterResponse;
};

export function FormUpdateCluster({ initialData }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<TClusterResponse>({
    resolver: zodResolver(UpdateClusterSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: TClusterResponse) => {
    try {
      const response = await updateCluster(initialData.id, data);
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
              <FormItem className="col-span-2">
                <Label htmlFor="name">Tên Cụm</Label>
                <FormControl>
                  <Input
                    placeholder="Nhập tên Cụm..."
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
            name="areaId"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <Label htmlFor="areaId">Khu vực</Label>
                <SelectAreaAsync
                  value={field.value}
                  onChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <Label htmlFor="status">Trạng Thái</Label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {statusOptions.map((option, index) => (
                        <SelectItem key={index} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
