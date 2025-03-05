/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {
  BuildingCreateSchema,
  TCreateBuildingRequest,
} from "@/schema/building.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { createBuilding } from "@/apis/building";
import { useRouter } from "next/navigation";
import { SelectClusterAsync } from "./select-cluster-async";
import { handleErrorApi } from "@/lib/utils";

type Props = {
  className?: string;
};

export function CredenzaCreateBuilding({ className }: Props) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const form = useForm<TCreateBuildingRequest>({
    resolver: zodResolver(BuildingCreateSchema),
    defaultValues: {
      name: "",
      code: "",
      clusterId: "",
      // hubId: "",
      latitude: "",
      longitude: "",
    },
  });

  const onSubmit = async (data: TCreateBuildingRequest) => {
    try {
      const response = await createBuilding(data);
      if (response.status === 201) {
        toast({
          title: "Tạo Tòa nhà thành công",
          description: "Tòa nhà đã được tạo thành công.",
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

  const { isSubmitting } = form.formState;

  return (
    <Credenza open={isOpen} onOpenChange={setIsOpen}>
      <CredenzaTrigger asChild className={className}>
        <Button variant="default" onClick={() => setIsOpen(true)}>
          Tạo Tòa nhà
        </Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Tạo Tòa nhà</CredenzaTitle>
          <CredenzaDescription>Nhập thông tin tòa nhà</CredenzaDescription>
        </CredenzaHeader>
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

              {/* <FormField
                control={form.control}
                name="hubId"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <Label htmlFor="hubId">Hub</Label>
                    <FormControl>
                      <Input
                        placeholder="Nhập ID hub..."
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

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
            <CredenzaFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Đang tạo..." : "Tạo Tòa nhà"}
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
