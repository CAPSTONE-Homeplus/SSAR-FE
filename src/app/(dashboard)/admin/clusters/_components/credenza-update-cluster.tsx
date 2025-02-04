"use client";
import React from "react";
import {
  Credenza,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaClose,
} from "@/components/ui/credenza";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ClusterResponseSchema,
  TUpdateClusterRequest,
} from "@/schema/cluster.schema";
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
import { statusOptions } from "./config";
import { SelectAreaAsync } from "./select-area-async";

type Props = {
  initialData: TUpdateClusterRequest & { id: string };
  setIsOpen: (open: boolean) => void;
  isOpen: boolean;
};

export function CredenzaUpdateCluster({
  initialData,
  isOpen,
  setIsOpen,
}: Props) {
  const { toast } = useToast();
  const form = useForm<TUpdateClusterRequest>({
    resolver: zodResolver(ClusterResponseSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: TUpdateClusterRequest) => {
    try {
      const response = await updateCluster(initialData.id, data);
      if (response.status === 200) {
        toast({
          title: "Cập nhật Cụm thành công",
          description: "Cụm đã được cập nhật thành công.",
        });
        form.reset();
        setIsOpen(false);
      } else {
        toast({
          title: "Lỗi",
          description: "Không thể cập nhật Cụm",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: `Có lỗi xảy ra khi cập nhật Cụm ${error.message}`,
        variant: "destructive",
      });
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <Credenza open={isOpen} onOpenChange={setIsOpen}>
      <CredenzaContent className="sm:max-w-[425px]">
        <CredenzaHeader>
          <CredenzaTitle>Cập nhật Cụm</CredenzaTitle>
          <CredenzaDescription>Nhập thông tin Cụm</CredenzaDescription>
        </CredenzaHeader>
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
            <CredenzaFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Đang cập nhật..." : "Cập nhật Cụm"}
              </Button>
              <CredenzaClose asChild>
                <Button type="button" variant="outline">
                  Hủy
                </Button>
              </CredenzaClose>
            </CredenzaFooter>
          </form>
        </Form>
      </CredenzaContent>
    </Credenza>
  );
}
