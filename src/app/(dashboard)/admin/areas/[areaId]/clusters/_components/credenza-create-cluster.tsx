"use client";
import { Button } from "@/components/ui/button";
import {
  Credenza,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  ClusterCreateSchema,
  TClusterCreateRequest,
} from "@/schema/cluster.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ReloadIcon } from "@radix-ui/react-icons";

type Props = {
  className?: string;
};

export function CredenzaCreateCluster({ className }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<TClusterCreateRequest>({
    resolver: zodResolver(ClusterCreateSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      createdBy: "",
      updatedBy: "",
    },
  });

  const onSubmit = (data: TClusterCreateRequest) => {
    console.log("Cluster Create Data:", data); // Log dữ liệu
    toast({
      title: "Tạo Cluster thành công",
    });
    form.reset();
  };

  return (
    <Credenza modal={false}>
      <CredenzaTrigger asChild className={className}>
        <Button variant="default">Tạo Cluster</Button>
      </CredenzaTrigger>
      <CredenzaContent className="sm:max-w-[425px]">
        <CredenzaHeader>
          <CredenzaTitle>Tạo Cluster</CredenzaTitle>
          <CredenzaDescription>Tạo cluster mới</CredenzaDescription>
        </CredenzaHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              {/* Tên Cluster */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên Cluster</FormLabel>
                    <FormControl>
                      <Input placeholder="Tên cluster..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Mô Tả */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Input placeholder="Mô tả..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Địa điểm */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa điểm</FormLabel>
                    <FormControl>
                      <Input placeholder="Địa điểm..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Người tạo */}
              <FormField
                control={form.control}
                name="createdBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Người tạo</FormLabel>
                    <FormControl>
                      <Input placeholder="Người tạo..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Người cập nhật */}
              <FormField
                control={form.control}
                name="updatedBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Người cập nhật</FormLabel>
                    <FormControl>
                      <Input placeholder="Người cập nhật..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <CredenzaFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Tạo
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
