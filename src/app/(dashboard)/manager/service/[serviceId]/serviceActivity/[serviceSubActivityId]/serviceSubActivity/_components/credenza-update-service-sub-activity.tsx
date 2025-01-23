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
import { SubServiceActivityUpdateSchema, TSubServiceActivityUpdateRequest } from "@/schema/service-sub-activity.schema";


type Props = {
  subServiceActivityData: TSubServiceActivityUpdateRequest; // Data passed to update form
};

export function UpdateServiceSubActivity({ subServiceActivityData }: Props) {
  const { toast } = useToast();
  const form = useForm<TSubServiceActivityUpdateRequest>({
    resolver: zodResolver(SubServiceActivityUpdateSchema),
    defaultValues: subServiceActivityData,
  });

  const onSubmit = async (data: TSubServiceActivityUpdateRequest) => {
    console.log("Sub Service Activity Updated: ", data);
    toast({
      title: "Cập nhật hoạt động phụ thành công",
    });
    form.reset();
  };

  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <Button variant="default">Cập Nhật Hoạt Động Phụ</Button>
      </CredenzaTrigger>
      <CredenzaContent className="sm:max-w-[425px]">
        <CredenzaHeader>
          <CredenzaTitle>Cập Nhật Hoạt Động Phụ</CredenzaTitle>
          <CredenzaDescription>
            Cập nhật thông tin hoạt động phụ
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
