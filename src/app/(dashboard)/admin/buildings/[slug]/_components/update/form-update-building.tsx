/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BuildingSchema, TBuildingResponse } from "@/schema/building.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { updateBuilding } from "@/apis/building";
import { useRouter } from "next/navigation";
import { statusOptions } from "../../../_components/config";
import { SelectClusterAsync } from "../../../_components/select-cluster-async";

type Props = {
  initialData: TBuildingResponse;
};

export function FormUpdateBuilding({ initialData }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<TBuildingResponse>({
    resolver: zodResolver(BuildingSchema),
    defaultValues: initialData,
  });

  console.log("Form state:", form.formState);
  const { errors } = form.formState;
  console.log("Form errors:", errors);
  const onSubmit = async (data: TBuildingResponse) => {
    console.log("data", data);
    try {
      const response = await updateBuilding(initialData.id, data);
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
                <Label htmlFor="name">Tên Tòa nhà</Label>
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

          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <Label htmlFor="code">Mã</Label>
                <FormControl>
                  <Input
                    placeholder="Nhập mã..."
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
            name="clusterId"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <Label htmlFor="clusterId">Cụm</Label>
                <FormControl>
                  <SelectClusterAsync
                    value={field.value}
                    onChange={field.onChange}
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
              <FormItem className="col-span-2">
                <Label htmlFor="status">Hub</Label>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
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

          <FormField
            control={form.control}
            name="longitude"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <Label htmlFor="longitude">Kinh độ</Label>
                <FormControl>
                  <Input
                    placeholder="Nhập kinh độ..."
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
            name="latitude"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <Label htmlFor="latitude">Vĩ độ</Label>
                <FormControl>
                  <Input
                    placeholder="Nhập vĩ độ..."
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
