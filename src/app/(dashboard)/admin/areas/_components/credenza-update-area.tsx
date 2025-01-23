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

type Props = {
  initialData: TUpdateAreaRequest;
  setIsOpen: (open: boolean) => void;
  isOpen: boolean;
};

export function CredenzaUpdateArea({ initialData, isOpen, setIsOpen }: Props) {
  const { toast } = useToast();
  const form = useForm<TUpdateAreaRequest>({
    resolver: zodResolver(AreaResponseSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: TUpdateAreaRequest) => {
    try {
      const response = await updateArea(initialData.id, data);
      if (response.status === 200) {
        toast({
          title: "Cập nhật khu vực thành công",
          description: "Khu vực đã được cập nhật thành công.",
        });
        form.reset();
        setIsOpen(false); // Đóng Credenza
      } else {
        toast({
          title: "Lỗi",
          description: "Không thể cập nhật khu vực",
          variant: "destructive",
        });
      }
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
    <Credenza open={isOpen} onOpenChange={setIsOpen}>
      <CredenzaContent className="sm:max-w-[425px]">
        <CredenzaHeader>
          <CredenzaTitle>Tạo Khu Vực</CredenzaTitle>
          <CredenzaDescription>Nhập thông tin khu vực mới</CredenzaDescription>
        </CredenzaHeader>
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
            <CredenzaFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Đang cập nhập..." : "Cập nhập Khu Vực"}
              </Button>
              <CredenzaClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsOpen(false)}
                >
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
