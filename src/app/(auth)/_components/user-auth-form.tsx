"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  LoginSchema,
  TAuthResponse,
  TLoginRequest,
} from "@/schema/auth.schema";
import { checkLoginManager, checkLoginAdmin } from "@/apis/authencation";
import { useRouter } from "next/navigation";
import authClient from "@/apis/clients/auth";
import z from "zod";
import { HttpResponse } from "@/lib/http";
const UserAuthForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<TLoginRequest & { role: "admin" | "manager" }>({
    resolver: zodResolver(
      LoginSchema.extend({
        role: z.string().min(1, { message: "Vui lòng chọn vai trò." }),
      })
    ),
    defaultValues: {
      phoneNumber: "",
      password: "",
      role: "manager",
    },
  });

  const { isSubmitting } = form.formState; // Lấy trạng thái `isSubmitting`

  const onSubmit = async (
    data: TLoginRequest & { role: "admin" | "manager" }
  ) => {
    const { role, ...loginData } = data;
    try {
      const response: HttpResponse<TAuthResponse> =
        data.role === "admin"
          ? await checkLoginAdmin(loginData)
          : await checkLoginManager(loginData);
      if (response.status === 200) {
        await authClient.auth({ user: response.payload });

        toast({
          title: "Chào mừng bạn trở lại",
          description: "Đang chuyển hướng...",
        });

        router.push(
          response.payload.role === "Admin"
            ? "/admin/overview"
            : "/manager/revenue"
        );
      }
    } catch (error) {
      console.error("Login error: ", error);
      toast({
        title: "Đăng nhập thất bại",
        description: "Vui lòng kiểm tra lại thông tin đăng nhập.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Phone Number */}
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập số điện thoại..."
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Nhập mật khẩu..."
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          {/* Role Select */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Vai trò</FormLabel> */}
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn vai trò" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserAuthForm;
