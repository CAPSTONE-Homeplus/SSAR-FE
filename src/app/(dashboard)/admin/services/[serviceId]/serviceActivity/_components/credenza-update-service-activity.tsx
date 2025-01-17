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
  ServiceActivityUpdateSchema,
  TServiceActivityUpdateRequest,
} from "@/schema/service-activity.schema";

type Props = {
  serviceActivityData: TServiceActivityUpdateRequest; // Data passed to update form
};

export function CredenzaUpdateServiceActivity({ serviceActivityData }: Props) {
  const { toast } = useToast();
  const form = useForm<TServiceActivityUpdateRequest>({
    resolver: zodResolver(ServiceActivityUpdateSchema),
    defaultValues: serviceActivityData,
  });

  const onSubmit = async (data: TServiceActivityUpdateRequest) => {
    console.log("Service Activity Updated: ", data);
    toast({
      title: "Cập nhật hoạt động dịch vụ thành công",
    });
    form.reset();
  };

  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <Button variant="default">Cập Nhật Hoạt Động Dịch Vụ</Button>
      </CredenzaTrigger>
      <CredenzaContent className="sm:max-w-[425px]">
        <CredenzaHeader>
          <CredenzaTitle>Cập Nhật Hoạt Động Dịch Vụ</CredenzaTitle>
          <CredenzaDescription>
            Cập nhật thông tin hoạt động dịch vụ
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
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trạng Thái</FormLabel>
                    <FormControl>
                      <Input placeholder="Trạng thái hoạt động..." {...field} />
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
