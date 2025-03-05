"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
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
import { SubServiceActivitySchema, TServiceSubActivityCreateRequest } from "@/schema/service-sub-activity.schema";


export function CreateServiceSubActivity() {
  const { toast } = useToast();
  const form = useForm<TServiceSubActivityCreateRequest>({
    resolver: zodResolver(SubServiceActivitySchema),
    defaultValues: {
      name: "",
      code: "",
      serviceActivityId: "",
    },
  });

  const onSubmit = async (data: TServiceSubActivityCreateRequest) => {
    console.log("New Service Sub-Activity Created: ", data);
    toast({
      title: "Tạo hoạt động dịch vụ phụ thành công",
    });
    form.reset();
  };

  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <Button variant="default">Tạo Hoạt Động Dịch Vụ Phụ</Button>
      </CredenzaTrigger>
      <CredenzaContent className="sm:max-w-[425px]">
        <CredenzaHeader>
          <CredenzaTitle>Tạo Hoạt Động Dịch Vụ Phụ</CredenzaTitle>
          <CredenzaDescription>
            Tạo thông tin hoạt động dịch vụ phụ mới
          </CredenzaDescription>
        </CredenzaHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên Hoạt Động Phụ</FormLabel>
                    <FormControl>
                      <Input placeholder="Tên hoạt động phụ..." {...field} />
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
                    <FormLabel>Mã Hoạt Động Phụ</FormLabel>
                    <FormControl>
                      <Input placeholder="Mã hoạt động phụ..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="serviceActivityId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID Hoạt Động Dịch Vụ</FormLabel>
                    <FormControl>
                      <Input placeholder="ID hoạt động dịch vụ..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <CredenzaFooter>
              <Button type="submit">Tạo Mới</Button>
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
