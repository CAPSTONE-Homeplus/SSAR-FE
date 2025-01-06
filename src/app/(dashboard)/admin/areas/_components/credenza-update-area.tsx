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
} from "@/components/ui/credenza"; // Import from Credenza
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateAreaSchema, TAreaRequest } from "@/schema/area.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

type Props = {
  className?: string;
  initialData: TAreaRequest; // Data passed to update form
};

export function CredenzaUpdateArea({ className, initialData }: Props) {
  const { toast } = useToast();
  const form = useForm<TAreaRequest>({
    resolver: zodResolver(UpdateAreaSchema),
    defaultValues: initialData, // Setting mock data as the default form values
  });

  const onSubmit = async (data: TAreaRequest) => {
    console.log("Updated data: ", data); // Log the updated data
    toast({
      title: "Cập nhật khu vực thành công",
    });
    form.reset(); // Reset form after successful submit
  };

  return (
    <Credenza>
      <CredenzaTrigger asChild className={className}>
        <Button variant="default">Cập Nhật Khu Vực</Button>
      </CredenzaTrigger>
      <CredenzaContent className="sm:max-w-[425px]">
        <CredenzaHeader>
          <CredenzaTitle>Cập Nhật Khu Vực</CredenzaTitle>
          <CredenzaDescription>Cập nhật thông tin khu vực</CredenzaDescription>
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
              <Button type="submit">Cập Nhật</Button>
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
