"use client";
import React from "react";
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
import { ServiceCreateSchema, TServiceCreateRequest } from "@/schema/service.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

type Props = {
  className?: string;
};

export function CredenzaCreateService({ className }: Props) {
  const { toast } = useToast();
  const form = useForm<TServiceCreateRequest>({
    resolver: zodResolver(ServiceCreateSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      discount: 0,
      prorityLevel: 0,
      duration: 0,
      maxCapacity: 0,
      serviceCode: "",
      serviceCategoryId: "",
      code: "",
    },
  });

  const onSubmit = async (data: TServiceCreateRequest) => {
    console.log("Submitted data: ", data); // Log dữ liệu đã submit
    toast({
      title: "Tạo dịch vụ thành công",
    });
    form.reset(); // Reset form sau khi submit thành công
  };

  return (
    <Credenza>
      <CredenzaTrigger asChild className={className}>
        <Button variant="default">Tạo Dịch Vụ</Button>
      </CredenzaTrigger>
      <CredenzaContent className="sm:max-w-[425px]">
        <CredenzaHeader>
          <CredenzaTitle>Tạo Dịch Vụ</CredenzaTitle>
          <CredenzaDescription>Tạo một dịch vụ mới</CredenzaDescription>
        </CredenzaHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              {[
                { label: "Tên Dịch Vụ", name: "name", placeholder: "Tên dịch vụ..." },
                { label: "Mô Tả", name: "description", placeholder: "Mô tả..." },
                { label: "Giá", name: "price", placeholder: "Giá..." },
                { label: "Giảm Giá", name: "discount", placeholder: "Giảm giá..." },
                { label: "Mức Độ Ưu Tiên", name: "prorityLevel", placeholder: "Mức độ ưu tiên..." },
                { label: "Thời Lượng", name: "duration", placeholder: "Thời lượng..." },
                { label: "Sức Chứa Tối Đa", name: "maxCapacity", placeholder: "Sức chứa tối đa..." },
                { label: "Mã Dịch Vụ", name: "serviceCode", placeholder: "Mã dịch vụ..." },
                { label: "Mã Danh Mục", name: "serviceCategoryId", placeholder: "Mã danh mục..." },
                { label: "Mã Code", name: "code", placeholder: "Mã code..." },
              ].map((field) => (
                <div key={field.name} className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={field.name} className="text-right">
                    {field.label}
                  </Label>
                  <div className="col-span-3">
                    <FormField
                      control={form.control}
                      name={field.name as keyof TServiceCreateRequest}
                      render={({ field: formField }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder={field.placeholder} {...formField} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
            <CredenzaFooter>
              <Button type="submit">Tạo Dịch Vụ</Button>
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
