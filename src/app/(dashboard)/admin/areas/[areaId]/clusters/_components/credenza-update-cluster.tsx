"use client";
import { Button } from "@/components/ui/button";
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
import { ClusterSchema, TClusterRequest } from "@/schema/cluster.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ReloadIcon } from "@radix-ui/react-icons";

type Props = {
  className?: string;
  initialData: TClusterRequest; // Accepting initial data as a prop
};

export function CredenzaUpdateCluster({ className, initialData }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<TClusterRequest>({
    resolver: zodResolver(ClusterSchema),
    defaultValues: initialData || {
      id: "",
      name: "",
      description: "",
      location: "",
      createdBy: "",
      updatedBy: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData); // Reset form when initial data is passed
    }
  }, [initialData]);

  const onSubmit = (data: TClusterRequest) => {
    console.log("Cluster Update Data:", data); // Log the data
    toast({
      title: "Cập nhật Cluster thành công",
    });
    form.reset();
  };

  return (
    <Credenza modal={false}>
      <CredenzaTrigger asChild className={className}>
        <Button variant="default">Cập nhật Credenza</Button>
      </CredenzaTrigger>
      <CredenzaContent className="sm:max-w-[425px]">
        <CredenzaHeader>
          <CredenzaTitle>Cập nhật Credenza</CredenzaTitle>
          <CredenzaDescription>Cập nhật thông tin Credenza</CredenzaDescription>
        </CredenzaHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              {/* ID Credenza */}
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID Credenza</FormLabel>
                    <FormControl>
                      <Input placeholder="ID Credenza..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Tên Credenza */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên Credenza</FormLabel>
                    <FormControl>
                      <Input placeholder="Tên Credenza..." {...field} />
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
                Cập nhật
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
