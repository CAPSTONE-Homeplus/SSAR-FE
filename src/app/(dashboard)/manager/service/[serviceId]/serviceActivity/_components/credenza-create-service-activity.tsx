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
import {
  ServiceActivityCreateSchema,
  TServiceActivityCreateRequest,
} from "@/schema/service-activity.schema";

export function CredenzaCreateServiceActivity() {
  const { toast } = useToast();
  const form = useForm<TServiceActivityCreateRequest>({
    resolver: zodResolver(ServiceActivityCreateSchema),
    defaultValues: {
      name: "",
      code: "",
      prorityLevel: 0,
      estimatedTimePerTask: "",
      safetyMeasures: "",
      serviceId: "",
    },
  });

  const onSubmit = async (data: TServiceActivityCreateRequest) => {
    console.log("New Service Activity Created: ", data);
    toast({
      title: "Tạo hoạt động dịch vụ thành công",
    });
    form.reset();
  };

  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <Button variant="default">Tạo Hoạt Động Dịch Vụ</Button>
      </CredenzaTrigger>
      <CredenzaContent className="sm:max-w-[425px]">
        <CredenzaHeader>
          <CredenzaTitle>Tạo Hoạt Động Dịch Vụ</CredenzaTitle>
          <CredenzaDescription>
            Tạo thông tin hoạt động dịch vụ mới
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
                    <FormLabel>Tên Hoạt Động</FormLabel>
                    <FormControl>
                      <Input placeholder="Tên hoạt động..." {...field} />
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
                    <FormLabel>Mã Hoạt Động</FormLabel>
                    <FormControl>
                      <Input placeholder="Mã hoạt động..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="prorityLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mức Độ Ưu Tiên</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Mức độ ưu tiên..."
                        {...field}
                        min={0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="estimatedTimePerTask"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thời Gian Dự Kiến Mỗi Nhiệm Vụ</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Thời gian dự kiến..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="safetyMeasures"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biện Pháp An Toàn</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Biện pháp an toàn..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="serviceId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID Dịch Vụ</FormLabel>
                    <FormControl>
                      <Input placeholder="ID dịch vụ..." {...field} />
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
