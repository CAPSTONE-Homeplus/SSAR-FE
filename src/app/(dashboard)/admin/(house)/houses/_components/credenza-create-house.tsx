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
import { HouseCreateSchema, TCreateHouseRequest } from "@/schema/house.schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createHouse } from "@/apis/house";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { SelectBuildingAsync } from "./select-building-async";
import { SelectHouseTypeAsync } from "./select-house-type-async";
import { handleErrorApi } from "@/lib/utils";

type Props = {
  className?: string;
};

export function CredenzaCreateHouse({ className }: Props) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const form = useForm<TCreateHouseRequest>({
    resolver: zodResolver(HouseCreateSchema),
    defaultValues: {
      no: "",
      numberOfRoom: "",
      status: "",
      code: "",
      bedroomCount: 0,
      bathroomCount: 0,
      hasBalcony: false,
      furnishingStatus: "",
      squareMeters: "",
      orientation: "",
      contactTerms: "",
      occupacy: "",
      buildingId: "",
      houseTypeId: "",
    },
  });

  const onSubmit = async (data: TCreateHouseRequest) => {
    try {
      const response = await createHouse(data);
      if (response.status === 201) {
        toast({
          title: "Tạo nhà thành công",
          description: "Nhà đã được tạo thành công.",
        });
        form.reset();
        setIsOpen(false);
        router.refresh();
      }
    } catch (error: any) {
      handleErrorApi({
        error,
      });
    }
  };

  const fields = [
    { name: "no", label: "Số thứ tự" },
    { name: "numberOfRoom", label: "Số phòng" },
    { name: "status", label: "Trạng thái" },
    { name: "code", label: "Mã nhà" },
    { name: "furnishingStatus", label: "Tình trạng nội thất" },
    { name: "squareMeters", label: "Diện tích (m²)" },
    { name: "orientation", label: "Hướng nhà" },
    { name: "contactTerms", label: "Điều khoản hợp đồng" },
    { name: "occupacy", label: "Tình trạng cư trú" },
  ];

  const { isSubmitting } = form.formState;

  return (
    <Credenza open={isOpen} onOpenChange={setIsOpen}>
      <CredenzaTrigger asChild className={className}>
        <Button variant="default" onClick={() => setIsOpen(true)}>
          Tạo Căn Hộ
        </Button>
      </CredenzaTrigger>
      <CredenzaContent className="max-w-4xl">
        <CredenzaHeader>
          <CredenzaTitle>Tạo Nhà</CredenzaTitle>
          <CredenzaDescription>Nhập thông tin nhà</CredenzaDescription>
        </CredenzaHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-6 gap-4 py-0 px-4 md:px-0 md:py-4">
              {fields.map(({ name, label }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name as keyof TCreateHouseRequest}
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <Label htmlFor={name}>{label}</Label>
                      <FormControl>
                        <Input
                          placeholder={`Nhập ${label}...`}
                          {...field}
                          value={
                            typeof field.value === "boolean"
                              ? String(field.value)
                              : field.value
                          }
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <FormField
                control={form.control}
                name="buildingId"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <Label htmlFor="areaId">Chọn tòa</Label>

                    <SelectBuildingAsync
                      value={field.value}
                      onChange={field.onChange}
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="houseTypeId"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <Label htmlFor="areaId">Khu vực</Label>

                    <SelectHouseTypeAsync
                      value={field.value}
                      onChange={field.onChange}
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bedroomCount"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <Label htmlFor="bedroomCount">Số phòng ngủ</Label>
                    <FormControl>
                      <Input type="number" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bathroomCount"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <Label htmlFor="bathroomCount">Số phòng tắm</Label>
                    <FormControl>
                      <Input type="number" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hasBalcony"
                render={({ field }) => (
                  <FormItem className="col-span-2 flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Ban công</FormLabel>
                      <FormDescription>
                        Chọn nếu nhà có ban công
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <CredenzaFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Đang tạo..." : "Tạo Nhà"}
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
