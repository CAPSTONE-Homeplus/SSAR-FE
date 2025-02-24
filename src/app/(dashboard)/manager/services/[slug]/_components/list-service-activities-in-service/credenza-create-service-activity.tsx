/* eslint-disable @typescript-eslint/no-explicit-any */
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

import { getAllServices } from "@/apis/service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ServiceActivityCreateSchema,
  TServiceActivityCreateRequest,
} from "@/schema/service-activity.schema";
import { createServiceActivity } from "@/apis/service-activity";

type Props = {
  className?: string;
};

export function CredenzaCreateServiceActivity({ className }: Props) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [services, setServices] = useState<{ id: string; name: string }[]>([]);

  const form = useForm<TServiceActivityCreateRequest>({
    resolver: zodResolver(ServiceActivityCreateSchema),
    defaultValues: {
      name: "",
      code: "",
      prorityLevel: 0,
      estimatedTimePerTask: "",
      safetyMeasures: "",
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

  const onSubmit = async (data: TServiceActivityCreateRequest) => {
    console.log("Dữ liệu gửi đi:", data);

    try {
      const response = await createServiceActivity(data);
      if (response.status === 201) {
        toast({
          title: "Tạo thành công",
          description: "Dịch vụ đã được tạo thành công.",
        });
        form.reset();
        setIsOpen(false);
      } else {
        toast({
          title: "Lỗi",
          description: "Không thể tạo dịch vụ",
          variant: "destructive",
        });
      }
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
        <Button variant="default">Tạo Dịch Vụ</Button>
      </CredenzaTrigger>
      <CredenzaContent className="sm:max-w-[500px]">
        <CredenzaHeader>
          <CredenzaTitle>Tạo Dịch Vụ</CredenzaTitle>
          <CredenzaDescription>Thêm dịch vụ mới</CredenzaDescription>
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
                    <Label htmlFor="name">Tên Dịch Vụ</Label>
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

              {/* Priority Level */}
              <FormField
                control={form.control}
                name="prorityLevel"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="priorityLevel">Mức độ ưu tiên</Label>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Nhập mức độ ưu tiên..."
                        {...field}
                        value={field.value ?? 0}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Estimated Time Per Task */}
              <FormField
                control={form.control}
                name="estimatedTimePerTask"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="estimatedTimePerTask">
                      Thời gian ước tính
                    </Label>
                    <FormControl>
                      <Input
                        placeholder="Nhập thời gian..."
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Safety Measures */}
              <FormField
                control={form.control}
                name="safetyMeasures"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="safetyMeasures">Biện pháp an toàn</Label>
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
