/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import {
  Credenza,
  CredenzaTrigger,
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { createOption } from "@/apis/option";
import { getAllServices } from "@/apis/service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  OptionCreateSchema,
  TOptionCreateRequest,
} from "@/schema/option.schema";
import { Switch } from "@/components/ui/switch";

type Props = {
  className?: string;
};

export function CredenzaCreateOption({ className }: Props) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [services, setServices] = useState<{ id: string; name: string }[]>([]);

  const form = useForm<TOptionCreateRequest>({
    resolver: zodResolver(OptionCreateSchema),
    defaultValues: {
      name: "",
      price: 0,
      note: "",
      isMandatory: false,
      maxQuantity: 1,
      discount: 0,
      code: "",
      serviceId: "",
    },
  });

  const { isSubmitting } = form.formState;

  useEffect(() => {
    const fetchAllServices = async () => {
      try {
        const response = await getAllServices();
        setServices(response.payload.items);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục dịch vụ:", error);
      }
    };

    fetchAllServices();
  }, []);

  const onSubmit = async (data: TOptionCreateRequest) => {
    try {
      const response = await createOption(data);
      if (response.status === 201) {
        toast({
          title: "Tạo thành công",
          description: "Tuỳ chọn đã được tạo thành công.",
        });
        form.reset();
        setIsOpen(false);
      } else {
        toast({
          title: "Lỗi",
          description: "Không thể tạo tuỳ chọn",
          variant: "destructive",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: `Có lỗi xảy ra: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  return (
    <Credenza open={isOpen} onOpenChange={setIsOpen}>
      <CredenzaTrigger asChild className={className}>
        <Button variant="default">Tạo Tuỳ Chọn</Button>
      </CredenzaTrigger>
      <CredenzaContent className="sm:max-w-[500px]">
        <CredenzaHeader>
          <CredenzaTitle>Tạo Tuỳ Chọn</CredenzaTitle>
          <CredenzaDescription>Thêm tuỳ chọn mới</CredenzaDescription>
        </CredenzaHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4 py-0 px-4 md:px-0 md:py-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="name">Tên Tuỳ Chọn</Label>
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

              {/* Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="price">Giá</Label>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Nhập giá..."
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Note */}
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="note">Ghi Chú</Label>
                    <FormControl>
                      <Input
                        placeholder="Nhập ghi chú..."
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* isMandatory */}
              <FormField
                control={form.control}
                name="isMandatory"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <Label htmlFor="isMandatory">Bắt Buộc</Label>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* maxQuantity */}
              <FormField
                control={form.control}
                name="maxQuantity"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="maxQuantity">Số Lượng Tối Đa</Label>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Nhập số lượng..."
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Discount */}
              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="discount">Giảm Giá (%)</Label>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Nhập giảm giá..."
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Code */}
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
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

              {/* Service ID */}
              <FormField
                control={form.control}
                name="serviceId"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="serviceId">Dịch Vụ</Label>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn dịch vụ" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <CredenzaFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Đang tạo..." : "Tạo"}
              </Button>
              <CredenzaClose asChild>
                <Button type="button" variant="secondary">
                  Đóng
                </Button>
              </CredenzaClose>
            </CredenzaFooter>
          </form>
        </Form>
      </CredenzaContent>
    </Credenza>
  );
}
