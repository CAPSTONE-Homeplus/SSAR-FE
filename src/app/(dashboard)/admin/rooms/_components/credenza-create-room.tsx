"use client";
import React, { useState } from "react";
import {
  Credenza,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaClose,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RoomCreateSchema, TCreateRoomRequest } from "@/schema/room.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createRoom } from "@/apis/room";
import { useRouter } from "next/navigation";
import { SelectRoomTypeAsync } from "./select-room-type-async";

export function CredenzaCreateRoom() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const form = useForm<TCreateRoomRequest>({
    resolver: zodResolver(RoomCreateSchema),
    defaultValues: {
      name: "",
      description: "",
      houseId: "",
      roomTypeId: "",
      createdBy: "",
      updatedBy: "",
    },
  });

  const onSubmit = async (data: TCreateRoomRequest) => {
    try {
      const response = await createRoom(data);
      if (response.status === 201) {
        toast({
          title: "Tạo phòng thành công",
          description: "Phòng đã được tạo thành công.",
        });
        form.reset();
        setIsOpen(false);
        router.refresh();
      } else {
        toast({
          title: "Lỗi",
          description: "Không thể tạo phòng",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: `Có lỗi xảy ra khi tạo phòng: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  return (
    <Credenza open={isOpen} onOpenChange={setIsOpen}>
      <CredenzaTrigger asChild>
        <Button variant="default" onClick={() => setIsOpen(true)}>
          Tạo Phòng
        </Button>
      </CredenzaTrigger>
      <CredenzaContent className="max-w-4xl">
        <CredenzaHeader>
          <CredenzaTitle>Tạo Phòng</CredenzaTitle>
          <CredenzaDescription>Nhập thông tin phòng</CredenzaDescription>
        </CredenzaHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-6 gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <Label htmlFor="name">Tên phòng</Label>
                    <FormControl>
                      <Input placeholder="Nhập tên phòng..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <Label htmlFor="description">Mô tả</Label>
                    <FormControl>
                      <Input placeholder="Nhập mô tả..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="houseId"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <Label htmlFor="houseId">Mã nhà</Label>
                    <FormControl>
                      <SelectRoomTypeAsync
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
                name="roomTypeId"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <Label htmlFor="roomTypeId">Loại phòng</Label>
                    <SelectRoomTypeAsync
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="createdBy"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <Label htmlFor="createdBy">Người tạo</Label>
                    <FormControl>
                      <Input placeholder="Nhập người tạo..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="updatedBy"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <Label htmlFor="updatedBy">Người cập nhật</Label>
                    <FormControl>
                      <Input placeholder="Nhập người cập nhật..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <CredenzaFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Đang tạo..." : "Tạo Phòng"}
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
