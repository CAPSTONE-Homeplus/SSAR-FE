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
import { CreateAreaSchema, TCreateAreaRequest } from "@/schema/area.schema";
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

export function CredenzaCreateArea({ className }: Props) {
  const { toast } = useToast();
  const form = useForm<TCreateAreaRequest>({
    resolver: zodResolver(CreateAreaSchema),
    defaultValues: {
      areaName: "",
      description: "",
      status: "ACTIVE",
    },
  });

  const onSubmit = async (data: TCreateAreaRequest) => {
    console.log("Submitted data: ", data); // Log the submitted data
    toast({
      title: "Tạo khu vực thành công",
    });
    form.reset(); // Reset form after successful submit
  };

  return (
    <Credenza>
      <CredenzaTrigger asChild className={className}>
        <Button variant="default">Tạo Khu Vực</Button>
      </CredenzaTrigger>
      <CredenzaContent className="sm:max-w-[425px]">
        <CredenzaHeader>
          <CredenzaTitle>Tạo Khu Vực</CredenzaTitle>
          <CredenzaDescription>Tạo một khu vực mới</CredenzaDescription>
        </CredenzaHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="areaName" className="text-right">
                  Tên Khu Vực
                </Label>
                <div className="col-span-3">
                  <FormField
                    control={form.control}
                    name="areaName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Tên khu vực..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Mô Tả
                </Label>
                <div className="col-span-3">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Mô tả..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Trạng Thái
                </Label>
                <div className="col-span-3">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Trạng thái..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <CredenzaFooter>
              <Button type="submit">Tạo Khu Vực</Button>
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
